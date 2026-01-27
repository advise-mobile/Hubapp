import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  processRequest: ['param'],
  processSuccess: ['data'],
});

export const ProcessTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

export const request = (state) => state.merge({
  loading: true,
  refreshing: false,
});

export const success = (state, action) => state.merge({
  data: action.data.itens[0],
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROCESS_REQUEST]: request,
  [Types.PROCESS_SUCCESS]: success,
});
