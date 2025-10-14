import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'services/Api';
import {OneSignal} from 'react-native-onesignal';

import {getLoggedUser} from 'helpers/Permissions';

import {PUSH} from 'helpers/StorageKeys';

// Função para verificar e corrigir Player ID inconsistente
const checkAndFixPlayerId = async () => {
	try {
		const storedPlayerId = await AsyncStorage.getItem('@onesignal_player_id');
		const currentPlayerId = await OneSignal.User.pushSubscription.getIdAsync();

		if (storedPlayerId && currentPlayerId && storedPlayerId !== currentPlayerId) {
			// Na v5.x não há um método direto para setar o Player ID
			// Mas podemos fazer logout/login para forçar uma nova sincronização
			OneSignal.logout();

			// Aguardar um pouco
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Fazer login novamente
			OneSignal.login(storedPlayerId);
		}

		return {storedPlayerId, currentPlayerId};
	} catch (error) {
		console.log('❌ Erro ao verificar Player ID:', error);
		return null;
	}
};

const registerNotification = async () => {
	let hash = null;
	let token = null;

	try {
		// Verificar e corrigir Player ID inconsistente
		await checkAndFixPlayerId();

		// Verificar Player ID armazenado localmente
		const storedPlayerId = await AsyncStorage.getItem('@onesignal_player_id');

		// Primeiro verificar permissões atuais
		try {
			const currentPermission = await OneSignal.Notifications.getPermissionAsync();
		} catch (permError) {
			// Handle permission error silently
		}

		// Solicitar permissão
		const permission = await OneSignal.Notifications.requestPermission(true);

		// Aguardar inicialização completa
		await new Promise(resolve => setTimeout(resolve, 3000));

		// Verificar permissões novamente após solicitação
		const permissionStatus = await OneSignal.Notifications.getPermissionAsync();

		// Verificar se as permissões estão corretas
		if (!permission || !permissionStatus) {
			return;
		}

		try {
			hash = await OneSignal.User.pushSubscription.getIdAsync();

			// Armazenar o Player ID atual
			if (hash) {
				await AsyncStorage.setItem('@onesignal_player_id', hash);
			}
		} catch (hashError) {
			console.log('❌ Erro ao obter Player ID:', hashError);
		}

		try {
			token = await OneSignal.User.pushSubscription.getTokenAsync();
		} catch (tokenError) {
			console.log('❌ Erro ao obter Push Token:', tokenError);
		}

		// Verificar estado da subscription
		try {
			const optedIn = OneSignal.User.pushSubscription.getOptedIn();
		} catch (optedError) {
			// Handle error silently
		}

		if (!hash && !token) {
			return;
		}

		if (!hash) {
			return;
		}
	} catch (error) {
		console.log('❌ Erro no OneSignal:', error.message);
		return;
	}

	const {idUsuarioCliente} = await getLoggedUser();

	const push = {
		idUsuarioCliente,
		hash,
		dispositivo: Platform.OS.toUpperCase(),
	};

	await Api.post(`/core/v1/push-notificacao`, {
		itens: [push],
	})
		.then(async () => {
			await AsyncStorage.setItem(PUSH, hash);
		})
		.catch(error => {
			console.log('❌ Erro ao registrar push no servidor:', error);
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
	checkAndFixPlayerId,
};
