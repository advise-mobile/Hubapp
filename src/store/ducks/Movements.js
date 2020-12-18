import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  movementsRequest: ['params'],
  toggleMovements: ['checked'],
  toggleAsRead: ['params'],
  movementsSuccess: ['data', 'page'],
  diariesRequest: ['params'],
  diariesSuccess: ['data'],
  clearMovements: null,
});

export const MovementsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  page: null,
  loading: false,
  diaries: [],
  userPermissions: [],
  endReached: false,
  havePermission: false
});

export const request = (state) => state.merge({
  loading: true,
  refreshing: false,
});

export const success = (state, action) => state.merge({
  data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
  page: action.page,
  endReached: action.data.endReached,
  loading: false,
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
}

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
}

export const diariesRequest = (state, action) => state.merge({
  loading: true,
});

export const diariesSuccess = (state, action) => {
  return state.merge({
    diaries: action.data,
    loading: false,
  })
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVEMENTS_REQUEST]: request,
  [Types.MOVEMENTS_SUCCESS]: success,
  [Types.CLEAR_MOVEMENTS]: clear,
  [Types.DIARIES_REQUEST]: diariesRequest,
  [Types.DIARIES_SUCCESS]: diariesSuccess,
  [Types.TOGGLE_MOVEMENTS]: toggleMovements,
  [Types.TOGGLE_AS_READ]: toggleAsRead,
});
