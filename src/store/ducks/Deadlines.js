import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  deadlinesRequest: null,
  deadlinesSuccess: ['data'],
  deadlinesFailure: null,
  deadlinesUpdateState: ['state'],

  // Move to file Deadline
  putDeadlineImportant: ['important', 'deadline'],
  putDeadlineImportantStatus: ['status'],
  putDeadlineConcluded: ['concluded', 'deadline'],
  putDeadlineConcludedStatus: ['status'],
  putDeadlineInnactive: ['id'],
  putDeadlineInnactiveStatus: ['status'],
});

export const DeadlinesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  deadlines: [],
  loading: false,
  error: undefined,
  importantRequestStatus: undefined,
});

export const DeadlinesRequest = state => state.merge({
  loading: true,
  failure: false,
});

export const DeadlinesSuccess = (state, action) => state.merge({
  deadlines: action.data,
  loading: false,
  failure: false,
});

export const DeadlinesFailure = state => state.merge({
  loading: false,
  failure: true,
});

export const DeadlinesUpdateState = (state, action) => state.merge({
  deadlines: action.state,
  loading: false,
  failure: false,
});

// Actions

export const putDeadlineImportant = state => state.merge({
  loading: true,
});

export const putDeadlineImportantStatus = (state, action) => state.merge({
  loading: false,
  importantRequestStatus: action.status,
});

export const putDeadlineConcluded = state => state.merge({
  loading: true,
});

export const putDeadlineConcludedStatus = (state, action) => state.merge({
  loading: false,
  concludedRequestStatus: action.status,
});

export const putDeadlineInnactive = state => state.merge({
  loading: true,
  error: undefined,
});

export const putDeadlineInnactiveStatus = (state, action) => state.merge({
  concludedRequestStatus: action.status,
  loading: false,
  error: undefined,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEADLINES_REQUEST]: DeadlinesRequest,
  [Types.DEADLINES_SUCCESS]: DeadlinesSuccess,
  [Types.DEADLINES_FAILURE]: DeadlinesFailure,
  [Types.DEADLINES_UPDATE_STATE]: DeadlinesUpdateState,

  [Types.PUT_DEADLINE_IMPORTANT]: putDeadlineImportant,
  [Types.PUT_DEADLINE_IMPORTANT_STATUS]: putDeadlineImportantStatus,
  [Types.PUT_DEADLINE_CONCLUDED]: putDeadlineConcluded,
  [Types.PUT_DEADLINE_CONCLUDED_STATUS]: putDeadlineConcludedStatus,
  [Types.PUT_DEADLINE_INNACTIVE]: putDeadlineInnactive,
  [Types.PUT_DEADLINE_INNACTIVE_STATUS]: putDeadlineInnactiveStatus,
});
