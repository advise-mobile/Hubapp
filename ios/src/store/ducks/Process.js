import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  processRequest: ['param'],
  processSuccess: ['data', 'page'],
  processAdd: ['data'],
  processAddSuccess: ['status'],
  clearProcess: null,
});

export const ProcessTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  page: null,
  loading: false,
});

export const request = (state) =>
  state.merge({
    loading: true,
    refreshing: false,
  });

export const success = (state, action) => {
  return state.merge({
    data:
      action.page === 1
        ? action.data.itens
        : [...state.data, ...action.data.itens],
    page: action.page,
    headers: action.data.processHeaders,
    loading: false,
  });
};

export const add = (state) => state.merge({ loading: true });

export const addSuccess = (state, action) =>
  state.merge({
    postSuccess: action.status,
    loading: false,
    error: undefined,
  });

export const clear = (state) =>
  state.merge({
    data: [],
    loading: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROCESS_REQUEST]: request,
  [Types.PROCESS_SUCCESS]: success,
  [Types.PROCESS_ADD]: add,
  [Types.PROCESS_ADD_SUCCESS]: addSuccess,
  [Types.CLEAR_PROCESS]: clear,
});
