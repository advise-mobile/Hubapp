import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  personRequest: [null],
  personSuccess: ['data', 'uf', 'types'],
  personEdit: ['param'],
  updatePicture: ['picture'],
  personUpdate: ['param'],
  personUpdateSuccess: null,
  changePasswordRequest: ['param'],
  updateProfile: ['param'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  picture: '',
  data: [],
  oab: [],
  ufs: [],
  typesOAB: [],
  loading: false,
});

export const updatePicture = (state, { picture }) => state.merge({
  picture: picture,
  data: {
    ...state.data,
    foto: picture
  },
});

export const updateProfile = (state, action) => state.merge({
  picture: action.param.foto,
  data: {
    ...state.data,
    foto: action.param.foto
  },
});

export const PersonRequest = (state) => state.merge({ loading: true });

export const PersonSuccess = (state, action) => state.merge({
  data: action.data.itens[0].pessoa,
  ufs: action.uf.itens,
  oab: action.data.itens[0].dadosOAB[0],
  typesOAB: action.types.itens,
  loading: false,
});

export const PersonUpdate = state => state.merge({ loading: true });

export const PersonUpdateSuccess = state => state.merge({ loading: false });

export const PersonEdit = (state, action) => state.merge({ ...state, ...action.param });

export const ChangePasswordRequest = (state) => state.merge({ loading: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERSON_REQUEST]: PersonRequest,
  [Types.PERSON_SUCCESS]: PersonSuccess,
  [Types.UPDATE_PICTURE]: updatePicture,
  [Types.PERSON_EDIT]: PersonEdit,
  [Types.PERSON_UPDATE]: PersonUpdate,
  [Types.PERSON_UPDATE_SUCCESS]: PersonUpdateSuccess,
  [Types.CHANGE_PASSWORD_REQUEST]: ChangePasswordRequest,
  [Types.UPDATE_PROFILE]: updateProfile,
});
