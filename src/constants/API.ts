import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
	AxiosHeaders,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from 'axios';

import {
	AVATAR,
	EXPIRES_TOKEN,
	REFRESH_TOKEN,
	TOKEN,
} from '@lhelpers/StorageKeys';

/** Produção — módulos em `src` usam apenas esta base. */
export const API_BASE_URL = 'https://api.advise.com.br/core/v1';

type RetryableConfig = InternalAxiosRequestConfig & {
	_retry?: boolean;
	redirectLogin?: boolean;
};

const api: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

if (__DEV__) {
	api.interceptors.request.use(
		config => {
			console.log('🔗 [API]', config.method?.toUpperCase(), config.url);
			console.log('📤 [API DATA]', config.data);
			console.log('📋 [API HEADERS]', config.headers);
			return config;
		},
		error => {
			console.log('❌ [API REQUEST ERROR]', error);
			return Promise.reject(error);
		},
	);

	api.interceptors.response.use(
		response => {
			console.log('✅ [API RESPONSE]', response.status, response.config.url);
			console.log('📥 [API RESPONSE DATA]', response.data);
			return response;
		},
		error => {
			console.log(
				'❌ [API RESPONSE ERROR]',
				error.response?.status,
				error.config?.url,
			);
			console.log('📥 [API ERROR DATA]', error.response?.data);
			return Promise.reject(error);
		},
	);
}

api.interceptors.request.use(
	async config => {
		const token = await AsyncStorage.getItem(TOKEN);
		if (token) {
			const headers = AxiosHeaders.from(config.headers ?? {});
			headers.set('Authorization', `Bearer ${token}`);
			config.headers = headers;
		}

		return config;
	},
	error => Promise.reject(error),
);

let isRefreshing = false;
type QueueProm = { resolve: (t: string) => void; reject: (e: unknown) => void };
let failedQueue: QueueProm[] = [];

function processQueue(error: unknown, token: string | null = null) {
	failedQueue.forEach(prom => {
		if (error) prom.reject(error);
		else if (token) prom.resolve(token);
	});
	failedQueue = [];
}

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config as RetryableConfig | undefined;

		if (
			!originalRequest ||
			!error.response ||
			error.response.status !== 401 ||
			originalRequest._retry
		) {
			return Promise.reject(error);
		}

		const { redirectLogin } = originalRequest;

		if (isRefreshing) {
			return new Promise<string>((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then(token => {
					originalRequest.headers = AxiosHeaders.from(
						originalRequest.headers ?? {},
					);
					originalRequest.headers.set('Authorization', `Bearer ${token}`);
					return axios(originalRequest);
				})
				.catch(err => Promise.reject(err));
		}

		originalRequest._retry = true;
		isRefreshing = true;

		const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
		const userData = {
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
		};

		return new Promise((resolve, reject) => {
			axios
				.post(`${API_BASE_URL}/login/v1/refresh-token`, userData)
				.then(async ({ data }) => {
					const expires = new Date(data['.expires']);

					await AsyncStorage.setItem(TOKEN, data.access_token);
					await AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
					await AsyncStorage.setItem(EXPIRES_TOKEN, expires.toString());

					if (data.foto) {
						await AsyncStorage.setItem(AVATAR, data.foto);
					}

					api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

					originalRequest.headers = AxiosHeaders.from(
						originalRequest.headers ?? {},
					);
					originalRequest.headers.set(
						'Authorization',
						`Bearer ${data.access_token}`,
					);

					processQueue(null, data.access_token);
					resolve(axios(originalRequest));
				})
				.catch(async () => {
					if (redirectLogin) {
						processQueue(error, null);
						reject(error);
						return;
					}

					const loginObject = await AsyncStorage.getItem('@loginObject');
					if (!loginObject) {
						processQueue(error, null);
						reject(error);
						return;
					}

					const credentials = JSON.parse(loginObject) as {
						username?: string;
						email?: string;
						password?: string;
					};

					const accessData = {
						username: credentials.username ?? credentials.email,
						password: credentials.password,
						grant_type: 'password',
						access_type: '94be650011cf412ca906fc335f615cdc',
					};

					axios
						.post(`${API_BASE_URL}/login/v1/token`, accessData)
						.then(async ({ data }) => {
							const expires = new Date(data['.expires']);

							await AsyncStorage.setItem(TOKEN, data.access_token);
							await AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
							await AsyncStorage.setItem(EXPIRES_TOKEN, expires.toString());

							if (data.foto) {
								await AsyncStorage.setItem(AVATAR, data.foto);
							}

							api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

							originalRequest.headers = AxiosHeaders.from(
								originalRequest.headers ?? {},
							);
							originalRequest.headers.set(
								'Authorization',
								`Bearer ${data.access_token}`,
							);

							processQueue(null, data.access_token);
							resolve(axios(originalRequest));
						})
						.catch(err => {
							processQueue(err, null);
							reject(err);
						});
				})
				.finally(() => {
					isRefreshing = false;
				});
		});
	},
);

export { api };
export default api;
