import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  movementReadRequest: ['params'],
  movementReadSuccess: null,
});

export const MovementTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
});

export const MovementReadRequest = state => state.merge({ loading: false });

export const MovementReadSuccess = state => state.merge({ loading: false });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVEMENT_READ_REQUEST]: MovementReadRequest,
  [Types.MOVEMENT_READ_SUCCESS]: MovementReadSuccess,
});
