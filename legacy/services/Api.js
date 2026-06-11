import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DEV_URL = 'https://dev-api.advise.com.br';
const HOMOLOG_URL = 'https://homologacao-api.advise.com.br';
const PROD_URL = 'https://api.advise.com.br';

// let BASE_URL = getUrl();
export const BASE_URL = PROD_URL;

import {
  TOKEN,
  REFRESH_TOKEN,
  EXPIRES_TOKEN,
  AVATAR,
} from '@lhelpers/StorageKeys';

const api = axios.create({
  baseURL: BASE_URL,
});

const AUTH_ROUTE_FRAGMENTS = [
  '/login/v1/token',
  '/login/v1/refresh-token',
  '/login/v1/redefinir-senha',
];

function isAuthRoute(url = '') {
  return AUTH_ROUTE_FRAGMENTS.some(fragment => url.includes(fragment));
}

async function persistTokens(data) {
  const expires = new Date(data['.expires']);

  await AsyncStorage.multiSet([
    [TOKEN, data.access_token || null],
    [REFRESH_TOKEN, data.refresh_token || null],
    [EXPIRES_TOKEN, expires.toString()],
  ]);

  if (data.foto) {
    await AsyncStorage.setItem(AVATAR, data.foto);
  }

  if (data.access_token) {
    api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
  }
}

export async function restoreSessionHeaders() {
  const token = await AsyncStorage.getItem(TOKEN);
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
}

export function logTokenExpiryMinutes(context = '') {
  if (!__DEV__) return;

  AsyncStorage.getItem(EXPIRES_TOKEN).then(raw => {
    if (!raw) {
      console.log('[TOKEN]', context, { expires: null, minutesLeft: null });
      return;
    }
    const expires = new Date(raw);
    const minutesLeft = (expires.getTime() - Date.now()) / (60 * 1000);
    console.log('[TOKEN]', context, {
      expires: expires.toISOString(),
      minutesLeft: minutesLeft.toFixed(1),
      expired: minutesLeft <= 0,
    });
  });
}

let isRefreshing = false;
let failedQueue = [];
let refreshPromise = null;

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

async function getTokenForRequest() {
  const expiresRaw = await AsyncStorage.getItem(EXPIRES_TOKEN);
  const expires = expiresRaw ? new Date(expiresRaw) : new Date(0);
  const token = await AsyncStorage.getItem(TOKEN);

  if (!token) {
    return null;
  }

  if (expires > new Date()) {
    return token;
  }

  if (!refreshPromise) {
    refreshPromise = getAccessToken()
      .then(data => {
        if (!data?.access_token) {
          throw new Error('Token refresh failed');
        }
        return data.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function applyTokenToRequest(requestConfig, accessToken) {
  requestConfig.headers = requestConfig.headers || {};
  requestConfig.headers.Authorization = `Bearer ${accessToken}`;
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

if (__DEV__) {
  api.interceptors.request.use(
    config => {
      console.log('🔗 [API REQUEST]', config.method?.toUpperCase(), config.url);
      console.log('📤 [DATA]', config.data);
      console.log('📋 [HEADERS]', config.headers);
      return config;
    },
    error => {
      console.log('❌ [REQUEST ERROR]', error);
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => {
      console.log('✅ [API RESPONSE]', response.status, response.config.url);
      return response;
    },
    error => {
      console.log(
        '❌ [RESPONSE ERROR]',
        error.response?.status,
        error.config?.url,
      );
      console.log('📥 [ERROR DATA]', error.response?.data);
      return Promise.reject(error);
    },
  );
}

api.interceptors.request.use(
  async config => {
    const url = config.url || '';

    if (isAuthRoute(url) || config._skipAuth) {
      return config;
    }

    try {
      const token = await getTokenForRequest();
      if (token) {
        applyTokenToRequest(config, token);
      }
    } catch (error) {
      if (__DEV__) {
        console.warn('[API] Falha ao anexar token na request:', url, error);
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const redirectLogin = originalRequest.redirectLogin;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            applyTokenToRequest(originalRequest, token);
            return api(originalRequest);
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

      return new Promise(function (resolve, reject) {
        axios
          .post(`${BASE_URL}/login/v1/refresh-token`, userData)
          .then(async ({ data }) => {
            await persistTokens(data);
            applyTokenToRequest(originalRequest, data.access_token);
            processQueue(null, data.access_token);
            resolve(api(originalRequest));
          })
          .catch(async refreshErr => {
            if (redirectLogin) {
              processQueue(refreshErr, null);
              reject(refreshErr);
              return;
            }

            try {
              const loginObject = await AsyncStorage.getItem('@loginObject');
              if (!loginObject) {
                throw refreshErr;
              }

              const credentials = JSON.parse(loginObject);
              const accessData = {
                username: credentials.username,
                password: credentials.password,
                grant_type: 'password',
                access_type: '94be650011cf412ca906fc335f615cdc',
              };

              const { data } = await axios.post(
                `${BASE_URL}/login/v1/token`,
                accessData,
              );

              await persistTokens(data);
              applyTokenToRequest(originalRequest, data.access_token);
              processQueue(null, data.access_token);
              resolve(api(originalRequest));
            } catch (fallbackErr) {
              processQueue(fallbackErr, null);
              reject(fallbackErr);
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export async function getUrl() {
  if (!__DEV__) return DEV_URL;

  const urlStorage = await AsyncStorage.getItem('@BaseUrl').then(urlStorage => {
    return urlStorage;
  });

  return urlStorage ? urlStorage : DEV_URL;
}

export async function changeAmbient() {
  if (!__DEV__) return;

  BASE_URL = BASE_URL == HOMOLOG_URL ? DEV_URL : HOMOLOG_URL;

  AsyncStorage.setItem('@BaseUrl', BASE_URL);
  api.defaults.baseURL = BASE_URL;

  return BASE_URL == HOMOLOG_URL ? 'HOMOLOG' : 'DEV';
}

export async function getLogin() {
  logTokenExpiryMinutes('getLogin');

  const expiresRaw = await AsyncStorage.getItem(EXPIRES_TOKEN);
  const expires = expiresRaw ? new Date(expiresRaw) : new Date(0);
  const now = new Date();

  if (expires > now) {
    await restoreSessionHeaders();
    return true;
  }

  const data = await getAccessToken();
  if (!data) {
    return false;
  }

  await restoreSessionHeaders();
  return data;
}

export async function getAccessToken() {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  const userData = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/login/v1/refresh-token`,
      userData,
    );

    await persistTokens(data);
    logTokenExpiryMinutes('getAccessToken:afterRefresh');
    return data;
  } catch (err) {
    try {
      const loginObject = await AsyncStorage.getItem('@loginObject');
      if (!loginObject) {
        return false;
      }

      const credentials = JSON.parse(loginObject);
      const accessData = {
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
        access_type: '94be650011cf412ca906fc335f615cdc',
      };

      const { data } = await axios.post(
        `${BASE_URL}/login/v1/token`,
        accessData,
      );

      await persistTokens(data);
      logTokenExpiryMinutes('getAccessToken:afterPasswordFallback');
      return data;
    } catch (fallbackErr) {
      return false;
    }
  }
}

export default api;
