import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  fetchSelectOptions: ['data'],
  fetchSelectOptionsSuccess: ['data'],
  fetchSelectOptionsFailure: ['message'],
});

export const SelectTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  selectOptions: {
    list: [],
    selected: undefined,
  },
  loading: false,
  error: undefined,
});

export const fetchSelectOptions = (state) => state.merge({ loading: true });

export const fetchSelectOptionsSuccess = (state, action) => state.merge({
  selectOptions: {
    list: action.data.list,
  },
  loading: false,
  error: undefined,
});

export const fetchSelectOptionsFailure = (state, action) => state.merge({
  loading: false,
  error: action.message,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_SELECT_OPTIONS]: fetchSelectOptions,
  [Types.FETCH_SELECT_OPTIONS_SUCCESS]: fetchSelectOptionsSuccess,
  [Types.FETCH_SELECT_OPTIONS_FAILURE]: fetchSelectOptionsFailure,
});
