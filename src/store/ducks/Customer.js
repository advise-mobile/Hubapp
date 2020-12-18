import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  customerRequest: null,
  customerSuccess: ['data'],
});

export const CustomerTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

export const CustomerRequest = (state) => state.merge({ loading: true });

export const CustomerSuccess = (state, action) => state.merge({
  data: action.data.itens[0],
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CUSTOMER_REQUEST]: CustomerRequest,
  [Types.CUSTOMER_SUCCESS]: CustomerSuccess,
});
