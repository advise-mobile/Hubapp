import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';
import OneSignal from 'react-native-onesignal';
import env from 'services/env';

import { getLoggedUser } from 'helpers/Permissions';


const registerNotification = async () => {
  OneSignal.setAppId(env.oneSignalId);

  const deviceState = await OneSignal.getDeviceState();

  const hash = deviceState.userId;

  if (!hash) return;

  const { idUsuarioCliente } = await getLoggedUser();

  const push = {
    idUsuarioCliente,
    hash,
    'dispositivo': Platform.OS.toUpperCase(),
  };

  // if (register === hash) return push;

  Api.post(`/core/v1/push-notificacao`, {
    itens: [push]
  }).then(() => {
    AsyncStorage.setItem('@Advise:pushHash', hash);
  }).finally(() => {
    OneSignal.sendTags(push);
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

  if (!hash) return true;

  const response = await Api.put(`/core/v1/push-notificacao/alterar-situacao-dispositivo`, {
    itens: [{
      hash,
      ativo: false,
    }]
  });

  return response;
};

export {
  registerNotification,
  getNotificationSettings,
  changeNotificationSettings,
  disableNotificationDevice
};
