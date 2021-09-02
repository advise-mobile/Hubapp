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
  deleteMovement: ['params'],
  deleteMovementProceeded: null,
  deleteMovementFromList: ['params'],

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
  deleting: false,
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

export const deleteMovementRequest = state => state.merge({ deleting: true });

export const deleteMovementProceeded = state => state.merge({ deleting: false });

export const deleteMovementFromList = (state, { params }) => state.merge({
  data: state.data.filter(move => move.id !== params.id)
});

export const diariesRequest = (state, action) => state.merge({
  loading: true,
});

export const diariesSuccess = (state, action) => {
  return state.merge({
    diaries: action.data,
  })
};

export const tribunalsRequest = state => state.merge({
  loading: true,
});

export const tribunalsSuccess = (state, action) => {
  return state.merge({
    tribunals: action.data,
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
  [Types.DELETE_MOVEMENT]: deleteMovementRequest,
  [Types.DELETE_MOVEMENT_PROCEEDED]: deleteMovementProceeded,
  [Types.DELETE_MOVEMENT_FROM_LIST]: deleteMovementFromList,
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
