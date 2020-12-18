import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['data'],
  loginFailure: null,
  logoutRequest: null,
  logoutSuccess: ['data'],
  logoutFailure: null,
  forgotRequest: ['email'],
  forgotSuccess: ['data'],
  forgotFailure: null,
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  data: {},
  email: null,
  password: null,
  isAuthorized: false,
  loading: false,
};

// Login

export const LoginRequest = (state, { email, password }) =>
  state.merge({
    email,
    password,
    isAuthorized: false,
    loading: true,
  });

export const LoginSuccess = (state, action) =>
  state.merge({
    data: action.data,
    isAuthorized: true,
    loading: false,
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

export const ForgotRequest = (state = INITIAL_STATE) =>
  state.merge({ loading: true });

export const ForgotSuccess = (state, action) =>
  state.merge({
    data: action.data,
    loading: false,
  });

export const ForgotFailure = (state) => state.merge({ loading: false });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: LoginRequest,
  [Types.LOGIN_SUCCESS]: LoginSuccess,
  [Types.LOGIN_FAILURE]: LoginFailure,

  [Types.LOGOUT_REQUEST]: LogoutRequest,
  [Types.LOGOUT_SUCCESS]: LogoutSuccess,
  [Types.LOGOUT_FAILURE]: LogoutFailure,

  [Types.FORGOT_REQUEST]: ForgotRequest,
  [Types.FORGOT_SUCCESS]: ForgotSuccess,
  [Types.FORGOT_FAILURE]: ForgotFailure,
});
