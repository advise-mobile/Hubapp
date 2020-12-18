import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  folderUnreadRequest: null,
  folderUnreadSuccess: ['data'],
  folderUnreadFailure: null,
});

export const FolderUnreadTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

export const request = state => state.merge({ loading: true, failure: false });

export const success = (state, action) =>
  state.merge({
    data: action.data,
    loading: false,
    failure: false,
  });

export const failure = (state, action) => state.merge({
  data: action.data,
  loading: false,
  failure: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOLDER_UNREAD_REQUEST]: request,
  [Types.FOLDER_UNREAD_SUCCESS]: success,
  [Types.FOLDER_UNREAD_FAILURE]: failure,
});
