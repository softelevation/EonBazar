import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: [],
  error: '',
};
export function list(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.MY_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
const order = combineReducers({
  list,
});
export default order;
