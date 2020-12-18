import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  tribunalRequest: ['param'],
  tribunalSuccess: ['data'],
  tribunalFailure: null,
});

export const TribunalTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  failure: false,
});

export const request = state => state.merge({ loading: true, failure: false });

export const success = (state, action) => state.merge({
  data: action.data.itens, loading: false, failure: false,
});

export const failure = state => state.merge({ loading: false, failure: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRIBUNAL_REQUEST]: request,
  [Types.TRIBUNAL_SUCCESS]: success,
  [Types.TRIBUNAL_FAILURE]: failure,
});
