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

export const INITIAL_STATE = {
  data: [],
  types: [],
  sending: false,
  loading: false,
  loadingMore: false,
  deleting: false,
  error: undefined,
  processing: false,
  endReached: false,
  loadingTypes: false,
  triggerChange: false,
  totalRegistros: 0,
  totalPaginas: 0,
};

export const deadlinesRequest = (state, action) => {
  const page = action.param?.page ?? 1;

  return {
    ...state,
    loading: page <= 1,
    loadingMore: page > 1,
    failure: false,
    endReached: page <= 1 ? false : state.endReached,
  };
};

export const deadlinesSuccess = (state, action) => {
  const itens = action.data.itens || [];
  const existingIdSet = new Set((state.data || []).map(item => item.id));
  const uniqueNew =
    action.page === 1 ? itens : itens.filter(item => !existingIdSet.has(item.id));
  const data = action.page === 1 ? itens : [...state.data, ...uniqueNew];
  const totalRegistros = action.data.totalRegistros || 0;
  const totalPaginas = action.data.totalPaginas || 0;
  const noNewItems = action.page > 1 && uniqueNew.length === 0;
  const reachedLastPage = totalPaginas > 0 && action.page >= totalPaginas;
  const endReached =
    Boolean(action.data.endReached) ||
    (totalRegistros > 0 && data.length >= totalRegistros) ||
    reachedLastPage ||
    (noNewItems && totalPaginas === 0);

  return {
    ...state,
    data,
    totalRegistros,
    totalPaginas,
    endReached,
    loading: false,
    loadingMore: false,
    updating: false,
    failure: false,
    triggerChange: false,
  };
};

export const deadlinesFailure = state => ({
  ...state,
  loading: false,
  loadingMore: false,
  failure: true,
});

export const deadlinesUpdateState = (state, action) => ({
  ...state,
  data: action.state,
  loading: false,
  failure: false,
});

export const deadlinesAdd = state => ({
  ...state,
  failure: false,
  processing: true,
});

export const deadlinesEdit = state => ({
  ...state,
  failure: false,
  processing: true,
});

export const deadlinesProcessSuccess = (state, action) => ({
  ...state,
  // data: [...action.data, ...state.data],
  processing: false,
  triggerChange: true,
});

export const deadlinesProccessFailure = state => ({
  ...state,
  processing: false,
});

export const emailRequest = state => ({
  ...state,
  sending: true,
});

export const emailSuccess = state => ({
  ...state,
  sending: false,
});

export const emailFailure = state => ({
  ...state,
  sending: false,
});
// Actions
export const markAsImportant = state => ({
  ...state,
  updating: true,
});

export const markAsConcluded = state => ({
  ...state,
  updating: true,
});

export const markAsInactive = state => ({
  ...state,
  deleting: true,
});

export const deadlinesAlterationSuccess = (state, action) => {
  const deadlines = state.data.map(deadline => {
    if (deadline.id != action.data.id) return deadline;

    const copy = Object.assign({}, deadline);

    Object.keys(action.data.params).map(
      key => (copy[key] = action.data.params[key]),
    );

    return copy;
  });

  return {
    ...state,
    data: deadlines,
    updating: false,
    deleting: false,
    triggerChange: true,
  };
};

export const typesRequest = state => ({
  ...state,
  loadingTypes: true,
});

export const typesSuccess = (state, action) => ({
  ...state,
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
