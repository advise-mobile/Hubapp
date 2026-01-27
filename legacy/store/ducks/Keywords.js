import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  keywordsRequest: null,
  keywordsSuccess: ['data'],
  keywordsFailure: null,
});

export const KeywordsTypes = Types;
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
    data: action.data.itens,
    loading: false,
    failure: false,
  });

export const failure = state =>
  state.merge({
    loading: false,
    failure: true,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.KEYWORDS_REQUEST]: request,
  [Types.KEYWORDS_SUCCESS]: success,
  [Types.KEYWORDS_FAILURE]: failure,
});
