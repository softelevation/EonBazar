import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';

const initialDistrictState = {
  loading: false,
  data: [],
  error: '',
};
export function payment(state = initialDistrictState, action) {
  switch (action.type) {
    case ActionConstants.PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case ActionConstants.PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default payment;
