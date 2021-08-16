import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  clearMovements: null,
  diariesRequest: ['params'],
  diariesSuccess: ['data'],
  movementsRefresh: ['params'],
  movementsRefreshSuccess: ['data', 'page', 'endReached'],
  movementsRequest: ['params'],
  movementsSuccess: ['data', 'page', 'endReached'],
  toggleAsRead: ['params'],
  toggleMovements: ['checked'],
  tribunalsRequest: ['params'],
  tribunalsSuccess: ['data'],

  movementsEmailRequest: ['param'],
  movementsEmailSuccess: null,
  movementsEmailFailure: null,
});

export const MovementsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  page: null,
  loading: false,
  loadingMore: false,
  refreshing: false,
  diaries: [],
  tribunals: [],
  userPermissions: [],
  endReached: false,
  havePermission: false,
  sending: false,
});

export const refreshRequest = state => state.merge({ refreshing: true });

export const refreshSuccess = (state, action) => state.merge({
  refreshing: false,
  data: action.data,
  page: action.page,
  endReached: action.endReached,
});

export const request = (state) => state.merge({
  loading: true,
  refreshing: false,
  loadingMore: true,
});

export const success = (state, action) => state.merge({
  data: action.page === 1 ? action.data : [...state.data, ...action.data],
  page: action.page,
  endReached: action.endReached,
  loading: false,
  loadingMore: false,
});

export const clear = (state) => state.merge({
  data: [],
  loading: false,
  endReached: false,
});

export const toggleMovements = (state, action) => {
  let movements = state.data.map(movement => {
    let movement_copy = Object.assign({}, movement);

    movement_copy.checked = action.checked;

    return movement_copy
  });

  return state.merge({
    data: movements
  });
};

export const toggleAsRead = (state, action) => {
  let movements = state.data.map(movement => {
    if (movement.id != action.params.movementId) return movement;

    let movement_copy = Object.assign({}, movement);

    movement_copy.lido = action.params.read;

    return movement_copy;
  });

  return state.merge({
    data: movements
  });
};

export const diariesRequest = (state, action) => state.merge({
  loading: true,
});

export const diariesSuccess = (state, action) => {
  return state.merge({
    diaries: action.data,
    loading: false,
  })
};

export const tribunalsRequest = state => state.merge({
  loading: true,
});

export const tribunalsSuccess = (state, action) => {
  return state.merge({
    tribunals: action.data,
    loading: false,
  })
};

export const emailRequest = state => state.merge({ sending: true });

export const emailSuccess = state => state.merge({ sending: false });

export const emailFailure = state => state.merge({ sending: false });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVEMENTS_REQUEST]: request,
  [Types.MOVEMENTS_SUCCESS]: success,
  [Types.MOVEMENTS_REFRESH]: refreshRequest,
  [Types.MOVEMENTS_REFRESH_SUCCESS]: refreshSuccess,
  [Types.CLEAR_MOVEMENTS]: clear,
  [Types.DIARIES_REQUEST]: diariesRequest,
  [Types.DIARIES_SUCCESS]: diariesSuccess,
  [Types.TRIBUNALS_REQUEST]: tribunalsRequest,
  [Types.TRIBUNALS_SUCCESS]: tribunalsSuccess,
  [Types.TOGGLE_MOVEMENTS]: toggleMovements,
  [Types.TOGGLE_AS_READ]: toggleAsRead,
  [Types.MOVEMENTS_EMAIL_REQUEST]: emailRequest,
  [Types.MOVEMENTS_EMAIL_SUCCESS]: emailSuccess,
  [Types.MOVEMENTS_EMAIL_FAILURE]: emailFailure,
});
