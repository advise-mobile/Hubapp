import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  fontsRequest: ['param'],
  fontsSuccess: ['data'],
  fontsFailure: null,
});

export const FontsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  failure: false,
});

export const request = state => state.merge({
  loading: true,
  failure: false,
});

export const success = (state, action) => state.merge({
  data: action.data.itens,
  loading: false,
  failure: false,
});

export const failure = state => state.merge({
  loading: false,
  failure: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FONTS_REQUEST]: request,
  [Types.FONTS_SUCCESS]: success,
  [Types.FONTS_FAILURE]: failure,
});
