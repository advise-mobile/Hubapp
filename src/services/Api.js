import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DEV_URL = 'https://dev-api.advise.com.br';
const HOMOLOG_URL = 'https://homologacao-api.advise.com.br';
const PROD_URL = 'https://api.advise.com.br';

// let BASE_URL = getUrl();
export const BASE_URL = PROD_URL;

import { TOKEN, REFRESH_TOKEN, EXPIRES_TOKEN, AVATAR } from 'helpers/StorageKeys';
// const TOKEN = '@Advise:token';
// const REFRESH_TOKEN = '@Advise:refreshToken';
// const EXPIRES_TOKEN = '@Advise:expires';

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getUrl() {
  if (!__DEV__) return PROD_URL;

  const urlStorage = await AsyncStorage.getItem('@BaseUrl').then(urlStorage => { return urlStorage });

  return urlStorage ? urlStorage : DEV_URL;
};

api.interceptors.request.use(async config => {
  const TOKEN_URL = `/login/v1/token`;

  const { url } = config;

  if (url === TOKEN_URL) return Promise.resolve(config);

  const expires = new Date(await AsyncStorage.getItem(EXPIRES_TOKEN));
  const now = new Date();

  let token = await AsyncStorage.getItem(TOKEN);

  if (expires < now) {
    const data = await getAccessToken();

    token = data.access_token;
  }

  const headers = { Authorization: `bearer ${token}` };

  if (token != null)
    config.headers = headers;

  return Promise.resolve(config);
},
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(undefined, async (error) => {
//   const originalRequest = error.config;
//   const { status } = error.response;

//   if (status !== 401)
//     return Promise.reject(error);

//   const accessToken = await getLogin();

//   if (accessToken === '') {
//     return Promise.reject(error);
//   }

//   originalRequest.headers.Authorization = `bearer ${accessToken}`;

//   return axios.request(originalRequest);
// });

export async function changeAmbient() {
  if (!__DEV__) return;

  BASE_URL = (BASE_URL == HOMOLOG_URL) ? DEV_URL : HOMOLOG_URL;

  AsyncStorage.setItem('@BaseUrl', BASE_URL);
  api.defaults.baseURL = BASE_URL;

  return (BASE_URL == HOMOLOG_URL) ? 'HOMOLOG' : 'DEV';
}

export async function getLogin() {
  const expires = new Date(await AsyncStorage.getItem(EXPIRES_TOKEN));
  const now = new Date();

  if (expires > now)
    return true;

  return await getAccessToken();
}

export async function getAccessToken() {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

  const userData = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  try {
    const { data } = await axios.post(`${BASE_URL}/login/v1/refresh-token`, userData);

    const expires = new Date(data['.expires']);

    await AsyncStorage.setItem(TOKEN, data.access_token);
    await AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
    await AsyncStorage.setItem(EXPIRES_TOKEN, expires.toString());
    if (data.foto) {
      await AsyncStorage.setItem(AVATAR, data.foto);
    }

    return data;
  } catch (err) {
    const credentials = JSON.parse(await AsyncStorage.getItem('@loginObject'));

    const accessData = {
      username: credentials.email,
      password: credentials.password,
      grant_type: 'password',
      access_type: '94be650011cf412ca906fc335f615cdc'
    };

    try {
      const { data } = await axios.post(`${BASE_URL}/login/v1/token`, accessData);

      await AsyncStorage.setItem(TOKEN, data.access_token);
      await AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
      await AsyncStorage.setItem(EXPIRES_TOKEN, expires.toString());
      if (data.foto) {
        await AsyncStorage.setItem(AVATAR, data.foto);
      }

      return data;

    } catch (err) {
      return false;
    }
  }
}

export default api;
