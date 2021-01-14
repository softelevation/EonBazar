import {ActionConstants} from '../constants';

// Cart Details
export const myOrderRequest = (payload) => {
  return {
    type: ActionConstants.MY_ORDERS_REQUEST,
    payload,
  };
};
export const myOrderSuccess = (data) => {
  return {
    type: ActionConstants.MY_ORDERS_SUCCESS,
    data,
  };
};
export const myOrderError = (error) => {
  return {
    type: ActionConstants.MY_ORDERS_ERROR,
    error,
  };
};
