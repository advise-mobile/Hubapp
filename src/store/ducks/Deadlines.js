import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  deadlinesFailure: null,
  deadlinesRequest: ['param'],
  deadlinesUpdateState: ['state'],
  deadlinesSuccess: ['data', 'page'],
  deadlinesAdd: ['itens'],
  deadlinesEdit: ['itens'],
  deadlinesProcessSuccess: ['data'],
  deadlinesProcessFailure: null,

  deadlinesEmailRequest: ['param'],
  deadlinesEmailSuccess: null,
  deadlinesEmailFailure: null,

  deadlinesMarkAsInactive: ['id'],
  deadlinesMarkAsImportant: ['param'],
  deadlinesMarkAsConcluded: ['param'],
  deadlinesAlterationSuccess: ['data'],

  deadlinesTypesRequest: null,
  deadlinesTypesSuccess: ['data'],
});

export const DeadlinesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  types: [],
  sending: false,
  loading: false,
  deleting: false,
  error: undefined,
  processing: false,
  endReached: false,
  loadingTypes: false,
  triggerChange: false,
});

export const deadlinesRequest = state => state.merge({
  loading: true,
  failure: false,
});

export const deadlinesSuccess = (state, action) => state.merge({
  data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
  endReached: action.data.endReached,
  loading: false,
  updating: false,
  failure: false,
  triggerChange: false,
});

export const deadlinesFailure = state => state.merge({
  loading: false,
  failure: true,
});

export const deadlinesUpdateState = (state, action) => state.merge({
  data: action.state,
  loading: false,
  failure: false,
});

export const deadlinesAdd = state => state.merge({
  failure: false,
  processing: true,
});

export const deadlinesEdit = state => state.merge({
  failure: false,
  processing: true,
});

export const deadlinesProcessSuccess = (state, action) => state.merge({
  // data: [...action.data, ...state.data],
  processing: false,
  triggerChange: true,
});

export const deadlinesProccessFailure = state => state.merge({
  processing: false,
});

export const emailRequest = state => state.merge({ sending: true });

export const emailSuccess = state => state.merge({ sending: false });

export const emailFailure = state => state.merge({ sending: false });
// Actions
export const markAsImportant = state => state.merge({
  updating: true,
});

export const markAsConcluded = state => state.merge({
  updating: true,
});

export const markAsInactive = state => state.merge({
  deleting: true,
});

export const deadlinesAlterationSuccess = (state, action) => {
  let deadlines = state.data.map(deadline => {
    if (deadline.id != action.data.id) return deadline;

    let copy = Object.assign({}, deadline);

    Object.keys(action.data.params).map(key => copy[key] = action.data.params[key]);

    return copy;
  });

  return state.merge({
    data: deadlines,
    updating: false,
    deleting: false,
    triggerChange: true,
  });
};

export const typesRequest = state => state.merge({
  loadingTypes: true
});

export const typesSuccess = (state, action) => state.merge({
  types: action.data.itens,
  loadingTypes: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEADLINES_REQUEST]: deadlinesRequest,
  [Types.DEADLINES_SUCCESS]: deadlinesSuccess,
  [Types.DEADLINES_FAILURE]: deadlinesFailure,
  [Types.DEADLINES_UPDATE_STATE]: deadlinesUpdateState,

  [Types.DEADLINES_ADD]: deadlinesAdd,
  [Types.DEADLINES_EDIT]: deadlinesEdit,
  [Types.DEADLINES_PROCESS_SUCCESS]: deadlinesProcessSuccess,
  [Types.DEADLINES_PROCESS_FAILURE]: deadlinesProccessFailure,

  [Types.DEADLINES_MARK_AS_IMPORTANT]: markAsImportant,
  [Types.DEADLINES_MARK_AS_CONCLUDED]: markAsConcluded,
  [Types.DEADLINES_MARK_AS_INACTIVE]: markAsInactive,

  [Types.DEADLINES_ALTERATION_SUCCESS]: deadlinesAlterationSuccess,

  [Types.DEADLINES_EMAIL_REQUEST]: emailRequest,
  [Types.DEADLINES_EMAIL_SUCCESS]: emailSuccess,
  [Types.DEADLINES_EMAIL_FAILURE]: emailFailure,

  [Types.DEADLINES_TYPES_REQUEST]: typesRequest,
  [Types.DEADLINES_TYPES_SUCCESS]: typesSuccess,
});
