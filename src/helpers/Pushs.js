import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';

import { getLoggedUser } from 'helpers/Permissions';


const registerNotification = async hash => {
  const register = await AsyncStorage.getItem('@Advise:pushHash');

  const { idUsuarioCliente } = await getLoggedUser();

  const push = {
    idUsuarioCliente,
    hash,
    'dispositivo': Platform.OS.toUpperCase(),
  };

  if (register == hash) return push;

  Api.post(`/core/v1/push-notificacao`, {
    itens: [push]
  }).then(() => {
    AsyncStorage.setItem('@Advise:pushHash', hash);
  });
};

const getNotificationSettings = async () => {
  const hash = await AsyncStorage.getItem('@Advise:pushHash');

  const { data } = await Api.get(`/core/v1/push-notificacao?hash=${hash}&campos=*`);

  const { itens } = data;

  return itens;
};

const changeNotificationSettings = async itens => await Api.put(`/core/v1/push-notificacao/alterar-situacao-notificacao`, itens);

const disableNotificationDevice = async () => {
  const hash = await AsyncStorage.getItem('@Advise:pushHash');

  const response = await Api.put(`/core/v1/push-notificacao/alterar-situacao-dispositivo`, {
    itens: [{
      hash,
      ativo: false,
    }]
  });

  console.log(response);
};

export {
  registerNotification,
  getNotificationSettings,
  changeNotificationSettings,
  disableNotificationDevice
};
