import {ActionConstants} from '../constants';

// District Details
export const paymentRequest = (payload) => {
  return {
    type: ActionConstants.PAYMENT_REQUEST,
    payload,
  };
};
export const paymentSuccess = (data) => {
  return {
    type: ActionConstants.PAYMENT_SUCCESS,
    data,
  };
};
export const paymentError = (error) => {
  return {
    type: ActionConstants.PAYMENT_ERROR,
    error,
  };
};
