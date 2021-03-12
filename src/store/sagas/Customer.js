import Api from 'services/Api';
import { getLoggedUser } from 'helpers/Permissions';
import { call, put, delay } from 'redux-saga/effects';

import CustomerActions from 'store/ducks/Customer';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { getLogin } from 'services/Api';

export function* getCustomer() {
  try {
    // Request Person
    const userInfo = yield getLoggedUser();
    const idCliente = userInfo.idCliente;
    const fields = 'id,pessoaCliente.idTipoPessoa,pessoaCliente.id,pessoaCliente.nome,pessoaCliente.CPFCNPJ,pessoaCliente.cep,pessoaCliente.logradouro,pessoaCliente.numeroEndereco,pessoaCliente.complementoEndereco,pessoaCliente.idMunicipio,pessoaCliente.idUFMunicipio,pessoaCliente.fone1,possuiGrupo';
    const expansion = 'pessoaCliente';

    yield getLogin();
    yield delay(300);

    const customer = yield call(
      Api.get,
      `/core/v1/clientes?campos=${fields}&expansao=${expansion}&IDs=${idCliente}`
    );

    yield put(CustomerActions.customerSuccess(customer.data));
  } catch (err) {
    const { status } = err.response;
    if (status !== 401) {
      yield put(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível carregar seus dados',
          true
        )
      );
    }
  }
}
