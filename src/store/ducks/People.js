import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  peopleRequest: ['param'],
  peopleSuccess: ['data', 'markers', 'page'],
  peopleAdd: ['data'],
  peopleAddSuccess: ['status'],
  clearPeople: null,
  setChecked: null,
});

export const PeopleTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  markers: [],
  page: null,
  loading: false,
  loadMarkers: true,
});

export const request = (state) =>
  state.merge({
    loading: true,
    refreshing: false,
  });

export const success = (state, action) => {
  let params = {
    data: action.page === 1 ? action.data.itens : [...state.data, ...action.data.itens],
    page: action.page,
    loading: false,
    loadMarkers: false,
  };

  if (action.markers) params.markers = action.markers.itens;
 
  return state.merge(params);
};

export const setChecked = (index, checked) => state.data[index].checked = checked;

export const add = (state) => state.merge({ loading: true });

export const addSuccess = (state, action) =>
  state.merge({
    postSuccess: action.status,
    loading: false,
    error: undefined,
  });

export const clear = (state) =>
  state.merge({
    data: [],
    loading: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PEOPLE_REQUEST]: request,
  [Types.PEOPLE_SUCCESS]: success,
  [Types.PEOPLE_ADD]: add,
  [Types.PEOPLE_ADD_SUCCESS]: addSuccess,
  [Types.CLEAR_PEOPLE]: clear,
  [Types.SET_CHECKED]: setChecked,
});
