import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  folderKeywordsRequest: ['params'],
  folderKeywordsSuccess: ['data', 'page'],
  folderKeywordsFailure: null,
});

export const FolderKeywordsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  failure: false,
  endReached: false,
  totalNotRead: 0
});

export const request = (state, action) => state.merge({
  loading: true,
  data: (action.params.page == 1) ? [] : state.data
});

export const success = (state, action) => {
  return state.merge({
    data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
    loading: false,
    endReached: action.data.endReached,
    totalNotRead: action.page === 1 ? action.data.movementsNotRead : state.totalNotRead + action.data.movementsNotRead
  })
};

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
