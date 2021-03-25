import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';

const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function shippingDetails(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.ADD_SHIPPING_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.ADD_SHIPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case ActionConstants.ADD_SHIPPING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
const shipping = combineReducers({
  shippingDetails,
});
export default shipping;
