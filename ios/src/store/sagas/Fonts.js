import Api from 'services/Api';
import { call, put } from 'redux-saga/effects';

import FontsActions from 'store/ducks/Fonts';

export function* getFonts(action) {
  try {
    const { numberProcess, tribunal } = action.param;

    const tribunalFilter = tribunal.join(',');

    const query = `campos=idFontePesquisa,nomeFontePesquisa&numeroProcesso=${numberProcess}&idOrgaoJudiciario=${tribunalFilter}`;
    const paginator = 'registrosPorPagina=100000';

    const { data } = yield call(
      Api.get,
      `/core/v1/processos-solicitados/fontes-parametros?${query}&${paginator}`
    );

    yield put(FontsActions.fontsSuccess(data));
  } catch (err) {
    yield put(FontsActions.fontsFailure());
  }
}
