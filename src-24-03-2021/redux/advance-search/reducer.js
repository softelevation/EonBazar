import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: [],
  error: '',
};
export function list(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.ADVANCE_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.ADVANCE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.ADVANCE_SEARCH_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
const advanceSearch = combineReducers({
  list,
});
export default advanceSearch;
