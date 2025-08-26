import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';
import * as OneSignalModule from 'react-native-onesignal';
const OneSignal = OneSignalModule.OneSignal;

import {getLoggedUser} from 'helpers/Permissions';

import {PUSH} from 'helpers/StorageKeys';

const registerNotification = async () => {
	// Solicita permissão para notificações push
	await OneSignal.Notifications.requestPermission(true);

	// Obtém o ID da subscription do usuário atual
	const hash = await OneSignal.User.pushSubscription.getIdAsync();

	if (!hash) return;

	const {idUsuarioCliente} = await getLoggedUser();

	const push = {
		idUsuarioCliente,
		hash,
		dispositivo: Platform.OS.toUpperCase(),
	};

	// if (register === hash) return push;

	await Api.post(`/core/v1/push-notificacao`, {
		itens: [push],
	})
		.then(async () => {
			await AsyncStorage.setItem(PUSH, hash);
		})
		.finally(() => {
			// Adiciona tags do usuário
			OneSignal.User.addTags(push);
		});
};

const getNotificationSettings = async () => {
	const hash = await AsyncStorage.getItem(PUSH);

	const {data} = await Api.get(`/core/v1/push-notificacao?hash=${hash}&campos=*`);

	const {itens} = data;

	return itens;
};

const changeNotificationSettings = async itens =>
	await Api.put(`/core/v1/push-notificacao/alterar-situacao-notificacao`, itens);

const disableNotificationDevice = async () => {
	const hash = await AsyncStorage.getItem(PUSH);

	if (!hash) return true;

	const response = await Api.put(`/core/v1/push-notificacao/alterar-situacao-dispositivo`, {
		itens: [
			{
				hash,
				ativo: false,
			},
		],
	});

	return response;
};

export {
	registerNotification,
	getNotificationSettings,
	changeNotificationSettings,
	disableNotificationDevice,
};
