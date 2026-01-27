import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  toastNotifyShow: ['message', 'error'],
  toastNotifyHide: null,
});

export const ToastNotifyTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  error: false,
  show: false,
  message: '',
});

export const show = (state, action) => ({
  error: action.error,
  show: true,
  message: action.message,
});

export const hide = () => ({
  error: false,
  show: false,
  message: '',
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOAST_NOTIFY_SHOW]: show,
  [Types.TOAST_NOTIFY_HIDE]: hide,
});
