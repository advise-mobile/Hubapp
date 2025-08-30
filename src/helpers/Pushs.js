import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';
import {OneSignal} from 'react-native-onesignal';

import {getLoggedUser} from 'helpers/Permissions';

import {PUSH} from 'helpers/StorageKeys';

const registerNotification = async () => {
	console.log('🔔 Iniciando registro de notificações OneSignal...');

	let hash = null;
	let token = null;

	try {
		// Solicita permissão para notificações push
		const permission = await OneSignal.Notifications.requestPermission(true);
		console.log('🔔 Permissão OneSignal:', permission);

		// Aguarda um pouco para garantir que o OneSignal foi inicializado
		await new Promise(resolve => setTimeout(resolve, 2000));

		// Obtém o ID da subscription do usuário atual
		hash = await OneSignal.User.pushSubscription.getIdAsync();
		console.log('🔔 Hash OneSignal (Player ID):', hash);

		// Também vamos tentar obter o Push Subscription Token
		token = await OneSignal.User.pushSubscription.getTokenAsync();
		console.log('🔔 OneSignal Push Token:', token);

		// Verificar o estado da subscription
		const optedIn = OneSignal.User.pushSubscription.getOptedIn();
		console.log('🔔 OneSignal OptedIn:', optedIn);

		if (!hash) {
			console.log('❌ Nenhum hash OneSignal encontrado');
			return;
		}
	} catch (error) {
		console.log('❌ Erro ao configurar OneSignal:', error);
		return;
	}

	const {idUsuarioCliente} = await getLoggedUser();

	const push = {
		idUsuarioCliente,
		hash,
		dispositivo: Platform.OS.toUpperCase(),
	};

	console.log('🔔 Dados do push:', push);

	// if (register === hash) return push;

	await Api.post(`/core/v1/push-notificacao`, {
		itens: [push],
	})
		.then(async () => {
			console.log('✅ Push registrado com sucesso no servidor');
			await AsyncStorage.setItem(PUSH, hash);
		})
		.catch(error => {
			console.log('❌ Erro ao registrar push no servidor:', error);
		})
		.finally(() => {
			// Adiciona tags do usuário
			console.log('🔔 Adicionando tags do usuário:', push);
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
