import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  jurisprudenceRequest: ['param'],
  jurisprudenceSuccess: ['data', 'page', 'filtered'],
  jurisprudenceFailure: null,
  jurisprudenceRefresh: ['param'],
  jurisprudenceRefreshSuccess: ['data'],
  jurisprudenceEmailRequest: ['param'],
  jurisprudenceEmailSuccess: null,
  jurisprudenceEmailFailure: null,
});

export const JurisprudenceTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  pagination: [],
  filters: [],
  loading: false,
  failure: false,
  endReached: false,
  refreshing: false,
  sending: false,
});

export const request = state => state.merge({ loading: true, failure: false });

export const success = (state, action) => state.merge({
  data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
  loading: false,
  failure: false,
  pagination: action.data.paginacao,
  endReached: action.data.endReached,
  filters: !action.filtered ? action.data.filtros : state.filters,
});

export const refreshRequest = state => state.merge({ refreshing: true });

export const refreshSuccess = (state, action) => state.merge({
  refreshing: false,
  data: action.data.itens,
  filters: action.data.filtros,
  loading: false,
});

export const failure = state => state.merge({ loading: false, failure: true, endReached: false });

export const emailRequest = state => state.merge({ sending: true });

export const emailSuccess = state => state.merge({ sending: false });

export const emailFailure = state => state.merge({ sending: false });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JURISPRUDENCE_REQUEST]: request,
  [Types.JURISPRUDENCE_SUCCESS]: success,
  [Types.JURISPRUDENCE_FAILURE]: failure,
  [Types.JURISPRUDENCE_REFRESH]: refreshRequest,
  [Types.JURISPRUDENCE_REFRESH_SUCCESS]: refreshSuccess,
  [Types.JURISPRUDENCE_EMAIL_REQUEST]: emailRequest,
  [Types.JURISPRUDENCE_EMAIL_SUCCESS]: emailSuccess,
  [Types.JURISPRUDENCE_EMAIL_FAILURE]: emailFailure,
});
