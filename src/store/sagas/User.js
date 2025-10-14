import Api from 'services/Api';
import {getLoggedUser} from 'helpers/Permissions';
import {AVATAR} from 'helpers/StorageKeys';
import {call, put, delay} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthAction from 'store/ducks/Auth';
import UserActions from 'store/ducks/User';
import ToastNotifyActions from 'store/ducks/ToastNotify';

export function* getPerson() {
	try {
		const userInfo = yield getLoggedUser();
		const idUsuarioCliente = userInfo.idUsuarioCliente;
		const fields =
			'id,emailUsuario,idPessoa,ativoUsuario,pessoa.idTipoPessoa,pessoa.id,pessoa.nome,pessoa.cpfcnpj,pessoa.idSexo,pessoa.dataNascimentoAbertura,pessoa.fone1,pessoa.fone2,pessoa.email,pessoa.fotoId,pessoa.foto,dadosOAB.id,dadosOAB.ativo,dadosOAB.numero,dadosOAB.idUF,dadosOAB.nomeUF,dadosOAB.idTipoOAB';
		const expansion = 'pessoa,dadosOAB';

		yield put(AuthAction.contractsRequest());

		yield put(UserActions.updatePicture());

		const person = yield call(
			Api.get,
			`/core/v1/usuarios-clientes?campos=${fields}&expansao=${expansion}&IDs=${idUsuarioCliente}`,
		);

		// Request UF
		const uf = yield call(
			Api.get,
			`/core/v1/uf?ativo=true&campos=id,sigla,nome&registrosPorPagina=-1`,
		);

		// Request Tipos OAB
		const types = yield call(Api.get, `/core/v1/tipos-oab?campos=id,nome&registrosPorPagina=-1`);

		yield put(UserActions.personSuccess(person.data, uf.data, types.data));
	} catch (err) {
		const {status} = err.response;
		if (status !== 401) {
			yield put(ToastNotifyActions.toastNotifyShow('Não foi possível carregar seus dados', true));
		}
	}
}

export function* updateProfile({param}) {
	try {
		const {extensao, foto} = param;

		const data = {
			itens: [
				{
					extensao,
					foto,
				},
			],
		};

		yield call(Api.post, '/core/v1/pessoas-fotos', data);

		yield AsyncStorage.setItem(AVATAR, foto);

		yield put(ToastNotifyActions.toastNotifyShow('Sucesso ao atualizar sua foto', false));
	} catch (err) {
		// console.log('Erro ao atualizar foto:', err);
		const errorMessage =
			err?.response?.data?.status?.erros?.[0]?.mensagem || 'Erro ao atualizar foto';
		yield put(ToastNotifyActions.toastNotifyShow(errorMessage, true));
	}
}

export function* updatePicture() {
	const foto = yield AsyncStorage.getItem(AVATAR);

	yield put(UserActions.updatePictureSuccess(foto));
}

export function* updatePerson({param}) {
	try {
		const userInfo = yield getLoggedUser();

		const {cpfcnpj, dataNascimentoAbertura, email, fone1, id, idSexo, nome} = param.data;

		const data = {
			itens: [
				{
					pessoa: {cpfcnpj, dataNascimentoAbertura, email, fone1, id, idSexo, nome},
					dadosOAB: [{...param.oab}],
					id: userInfo.idUsuarioCliente,
				},
			],
		};

		yield call(Api.put, '/core/v1/usuarios-clientes', data);

		yield put(UserActions.personUpdateSuccess());
		yield put(ToastNotifyActions.toastNotifyShow('Sucesso ao atualizar os seus dados', false));
	} catch (err) {
		yield put(ToastNotifyActions.toastNotifyShow(err.response.data.status.erros[0].mensagem, true));
	}
}

export function* changePassword(action) {
	const data = {
		itens: [
			{
				email: action.param.email,
				senhaAtual: action.param.password,
				novaSenha: action.param.passwordNew,
				confirmacaoNovaSenha: action.param.passwordNew,
			},
		],
	};

	try {
		const response = yield call(Api.put, '/core/v1/usuarios/usuario-logado-alterar-senha', data);

		yield put(ToastNotifyActions.toastNotifyShow(response.data.status.mensagem));
	} catch (err) {
		switch (err.response.status) {
			case 400:
				yield put(
					ToastNotifyActions.toastNotifyShow(err.response.data.status.erros[0].mensagem, true),
				);
				break;
			case 500:
				yield put(
					ToastNotifyActions.toastNotifyShow(err.response.data.status.erros[0].mensagem, true),
				);
				break;
			default:
				yield put(ToastNotifyActions.toastNotifyShow('Não foi possível alterar sua senha', true));
		}
	}
}
