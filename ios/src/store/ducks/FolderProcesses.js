import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  folderProcessesRequest: null,
  folderProcessesSuccess: ['data'],
  folderProcessesFailure: null,
});

export const FolderProcessesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: true,
});

export const request = (state) => state.merge({ loading: true });

export const success = (state, action) =>
  state.merge({
    data: action.data.itens,
    loading: false,
  });

export const failure = (state, action) =>
  state.merge({
    data: action.data,
    loading: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLDER_PROCESSES_REQUEST]: request,
  [Types.FOLDER_PROCESSES_SUCCESS]: success,
  [Types.FOLDER_PROCESSES_FAILURE]: failure,
});
