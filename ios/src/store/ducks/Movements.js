import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  movementsRequest: ['param'],
  movementsSuccess: ['data', 'page'],
  clearMovements: null,
});

export const MovementsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  page: null,
  loading: false,
  userPermissions: [],
  havePermission: false
});

export const request = (state) =>
  state.merge({
    loading: true,
    refreshing: false,
  });

export const success = (state, action) =>
  state.merge({
    data:
      action.page === 1
        ? action.data.itens
        : [...state.data, ...action.data.itens],
    page: action.page,
    loading: false,
  });

export const clear = (state) =>
  state.merge({
    data: [],
    loading: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVEMENTS_REQUEST]: request,
  [Types.MOVEMENTS_SUCCESS]: success,
  [Types.CLEAR_MOVEMENTS]: clear,
});
