import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';

const initialDistrictState = {
  loading: false,
  data: [],
  error: '',
};
export function district(state = initialDistrictState, action) {
  switch (action.type) {
    case ActionConstants.SEARCH_DISTRICT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.SEARCH_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case ActionConstants.SEARCH_DISTRICT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
const initialCityState = {
  loading: false,
  data: [],
  error: '',
};

export function cities(state = initialCityState, action) {
  switch (action.type) {
    case ActionConstants.SEARCH_AREA_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.SEARCH_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case ActionConstants.SEARCH_AREA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const Area = combineReducers({
  district,
  cities,
});
export default Area;
