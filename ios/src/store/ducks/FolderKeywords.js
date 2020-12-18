import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  folderKeywordsRequest: null,
  folderKeywordsSuccess: ['data'],
  folderKeywordsFailure: null,
});

export const FolderKeywordsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  failure: false,
});

export const request = state => state.merge({ loading: true });

export const success = (state, action) => state.merge({
  data: action.data.itens,
  loading: false,
});

export const failure = (state) => state.merge({
  data: null,
  loading: false,
  failure: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLDER_KEYWORDS_REQUEST]: request,
  [Types.FOLDER_KEYWORDS_SUCCESS]: success,
  [Types.FOLDER_KEYWORDS_FAILURE]: failure,
});
