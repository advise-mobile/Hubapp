import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  journalRequest: ['param'],
  journalSuccess: ['data'],
  journalFailure: null,
});

export const JournalTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  failure: false,
});

export const request = state =>
  state.merge({
    loading: true,
    failure: false,
  });

export const success = (state, action) =>
  state.merge({
    data: action.data,
    loading: false,
    failure: false,
  });

export const failure = state =>
  state.merge({
    loading: false,
    failure: true,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOURNAL_REQUEST]: request,
  [Types.JOURNAL_SUCCESS]: success,
  [Types.JOURNAL_FAILURE]: failure,
});
