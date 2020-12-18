import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  oabRequest: null,
  oabSuccess: ['data'],
  personRequest: null,
  personSuccess: ['data', 'uf'],
  changePasswordRequest: ['param'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  uf: [],
  loading: false,
});

export const OabRequest = (state) => state.merge({ loading: true });

export const OabSuccess = (state, action) =>
  state.merge({
    data: action.data.itens[0].dadosOAB,
    loading: false,
  });

export const PersonRequest = (state) => state.merge({ loading: true });

export const PersonSuccess = (state, action) =>
  state.merge({
    data: action.data.itens[0].pessoa,
    uf: action.uf.itens[0],
    loading: false,
  });

export const ChangePasswordRequest = (state) => state.merge({ loading: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OAB_REQUEST]: OabRequest,
  [Types.OAB_SUCCESS]: OabSuccess,
  [Types.PERSON_REQUEST]: PersonRequest,
  [Types.PERSON_SUCCESS]: PersonSuccess,
  [Types.CHANGE_PASSWORD_REQUEST]: ChangePasswordRequest,
});
