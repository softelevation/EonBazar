import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: [],
  error: '',
};
export function list(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.BANNER_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
const banner = combineReducers({
  list,
});
export default banner;
