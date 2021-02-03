import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  movementRequest: ['param'],
  movementSuccess: ['data'],
  movementReadRequest: ['params'],
  movementReadSuccess: null,
});

export const MovementTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: {},
  movementId: null,
  loading: false,
});

export const request = state => state.merge({ loading: true });

export const success = (state, action) => state.merge({
  data: action.data.itens[0],
  loading: false,
});

export const MovementReadRequest = state => state.merge({ loading: false });

export const MovementReadSuccess = state => state.merge({ loading: false });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVEMENT_REQUEST]: request,
  [Types.MOVEMENT_SUCCESS]: success,
  [Types.MOVEMENT_READ_REQUEST]: MovementReadRequest,
  [Types.MOVEMENT_READ_SUCCESS]: MovementReadSuccess,
});
