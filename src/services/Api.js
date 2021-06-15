import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DEV_URL = 'https://dev-api.advise.com.br';
const HOMOLOG_URL = 'https://homologacao-api.advise.com.br';
const PROD_URL = 'https://api.advise.com.br';

// let BASE_URL = getUrl();
export const BASE_URL = PROD_URL;
const TOKEN = '@Advise:token';
const REFRESH_TOKEN = '@Advise:refreshToken';
const AVATAR = '@Advise:avatar';

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

  const token = await AsyncStorage.getItem(TOKEN);

  const headers = { Authorization: `bearer ${token}` };

  if (token != null && url !== TOKEN_URL)
    config.headers = headers;

  return Promise.resolve(config);
},
  (error) => Promise.reject(error)
);

api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  const { status } = error.response;

  if (status !== 401)
    return Promise.reject(error);

  const accessToken = await getLogin();

  if (accessToken === '') {
    return Promise.reject(error);
  }

  originalRequest.headers.Authorization = `bearer ${accessToken}`;

  return axios.request(originalRequest);
});

export async function changeAmbient() {
  if (!__DEV__) return;

  BASE_URL = (BASE_URL == HOMOLOG_URL) ? DEV_URL : HOMOLOG_URL;

  AsyncStorage.setItem('@BaseUrl', BASE_URL);
  api.defaults.baseURL = BASE_URL;

  return (BASE_URL == HOMOLOG_URL) ? 'HOMOLOG' : 'DEV';
}

export async function getLogin() {
  const user = JSON.parse(await AsyncStorage.getItem('@loginObject'));

  try {
    if (user) {
      const userData = {
        username: user.email,
        password: user.password,
        grant_type: 'password',
        access_type: '94be650011cf412ca906fc335f615cdc'
      };

      const data = await axios.post(`${BASE_URL}/login/v1/token`, userData).then(async data => {
        await AsyncStorage.multiSet([
          [TOKEN, data.access_token],
          [REFRESH_TOKEN, data.refresh_token],
          [AVATAR, data.foto || ''],
        ]);

        return data;
      });

      return data;
    }
  } catch (e) {
    // setTimeout(async () => {
    //   await getLogin();
    // }, 2000);
  }

  return await AsyncStorage.getItem(TOKEN);
}
/*
 * Aqui era o interceptor pra pegar o refresh token
 * Eu substitui pra ele fazer request pra api de Login no lugar disso
 * essa medida foi tomada para não auterar o tempo de validade do refresh token no backend]
 *
 * **** Essa função será usada ==> getLogin() falhar ****
 * **** Caso essa também falhe, o usuário terá q logar de novo. ****
 *
 */
export async function getAccessToken() {
  const accessToken = '';
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

  const userData = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  const { data } = axios.post(`${BASE_URL}/login/v1/refresh-token`, userData);
  await AsyncStorage.setItem(TOKEN, data.access_token);
  await AsyncStorage.setItem(REFRESH_TOKEN, data.refresh_token);
  if (data.foto) {
    await AsyncStorage.setItem(AVATAR, data.foto);
  }

  return accessToken;
}

export default api;
