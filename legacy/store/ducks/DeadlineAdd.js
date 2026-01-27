import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  postDeadline: ['deadline'],
  postDeadlineSuccess: ['status'],
  postDeadlineFailure: ['message'],
  putDeadline: ['deadline'],
  putDeadlineStatus: ['status'],
  getScheduleId: ['token'],
  getScheduleIdStatus: ['id'],
  clear: null,
});

export const DeadlineAddTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  error: undefined,
});

export const postDeadlines = (state) => state.merge({ loading: true });

export const getScheduleId = (state) => state.merge({ loading: true });

export const getScheduleIdStatus = (state, action) =>
  state.merge({
    scheduleId: action.id,
    loading: false,
    error: undefined,
  });

export const putDeadline = (state) => state.merge({ loading: true });

export const putDeadlineStatus = (state, action) =>
  state.merge({
    putStatus: action.status,
    loading: false,
    error: undefined,
  });

export const postDeadlinesSuccess = (state, action) =>
  state.merge({
    postSuccess: action.status,
    loading: false,
    error: undefined,
  });

export const postDeadlinesFailure = (state, action) =>
  state.merge({
    loading: false,
    error: action.message,
  });

export const clear = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_DEADLINE]: postDeadlines,
  [Types.POST_DEADLINE_SUCCESS]: postDeadlinesSuccess,
  [Types.POST_DEADLINE_FAILURE]: postDeadlinesFailure,
  [Types.PUT_DEADLINE]: putDeadline,
  [Types.PUT_DEADLINE_STATUS]: putDeadlineStatus,
  [Types.GET_SCHEDULE_ID]: getScheduleId,
  [Types.GET_SCHEDULE_ID_STATUS]: getScheduleIdStatus,
  [Types.CLEAR]: clear,
});
