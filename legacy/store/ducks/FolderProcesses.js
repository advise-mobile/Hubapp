import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  folderProcessesRequest: ['params'],
  folderProcessesSuccess: ['data', 'page'],
  folderProcessesFailure: null,
});

export const FolderProcessesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: true,
  endReached: false,
  totalNotRead: 0
});

export const request = (state, action) => state.merge({
  loading: true,
  data: (action.params.page == 1) ? [] : state.data
});

export const success = (state, action) => state.merge({
  data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
  loading: false,
  endReached: action.data.endReached,
  totalNotRead: action.page === 1 ? action.data.movementsNotRead : state.totalNotRead + action.data.movementsNotRead
});

export const failure = (state, action) => state.merge({
  data: action.data,
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLDER_PROCESSES_REQUEST]: request,
  [Types.FOLDER_PROCESSES_SUCCESS]: success,
  [Types.FOLDER_PROCESSES_FAILURE]: failure,
});
