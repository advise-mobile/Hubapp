import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['data', 'convenio', 'active'],
  loginFailure: null,
  logoutRequest: null,
  logoutSuccess: ['data'],
  forgotReset: null,
  logoutFailure: null,
  forgotRequest: ['email'],
  forgotSuccess: ['data'],
  forgotFailure: null,
  contractsRequest: null,
  contractsSuccess: ['convenio', 'active'],
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: {},
  email: null,
  password: null,
  isAuthorized: false,
  loading: false,
  convenio: false,
  active: true,
  sended: false,
});

// Login

export const LoginRequest = (state, { email, password }) =>
  state.merge({
    email,
    password,
    isAuthorized: false,
    loading: true,
  });

export const LoginSuccess = (state, action) => state.merge({
  data: action.data,
  isAuthorized: true,
  loading: false,
  convenio: action.convenio,
  active: action.active,
});

export const LoginFailure = (state) =>
  state.merge({ isAuthorized: false, loading: false });

// Logout

export const LogoutRequest = (state) =>
  state.merge({ isAuthorized: false, loading: false });

export const LogoutSuccess = (state) =>
  state.merge({ isAuthorized: false, loading: false });

export const LogoutFailure = (state) =>
  state.merge({ isAuthorized: false, loading: false });

// Forgot

export const ForgotReset = (state = INITIAL_STATE) =>
  state.merge({ loading: false, sended: false });

export const ForgotRequest = (state = INITIAL_STATE) =>
  state.merge({ loading: true });

export const ForgotSuccess = (state, action) =>
  state.merge({
    sended: true,
    data: action.data,
    loading: false,
  });

export const ForgotFailure = (state) => state.merge({ loading: false, sended: false });

//Contratos

export const ContractsRequest = (state) => state.merge({
  // convenio: false,
  // active: false,
});

export const ContractsSuccess = (state, action) => state.merge({
  convenio: action.convenio,
  active: action.active,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: LoginRequest,
  [Types.LOGIN_SUCCESS]: LoginSuccess,
  [Types.LOGIN_FAILURE]: LoginFailure,

  [Types.LOGOUT_REQUEST]: LogoutRequest,
  [Types.LOGOUT_SUCCESS]: LogoutSuccess,
  [Types.LOGOUT_FAILURE]: LogoutFailure,

  [Types.FORGOT_RESET]: ForgotReset,
  [Types.FORGOT_REQUEST]: ForgotRequest,
  [Types.FORGOT_SUCCESS]: ForgotSuccess,
  [Types.FORGOT_FAILURE]: ForgotFailure,

  [Types.CONTRACTS_REQUEST]: ContractsRequest,
  [Types.CONTRACTS_SUCCESS]: ContractsSuccess,
});
