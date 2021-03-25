import {ActionConstants} from '../constants';

// Cart Details
export const addShippingRequest = (payload) => {
  return {
    type: ActionConstants.ADD_SHIPPING_REQUEST,
    payload,
  };
};
export const addShippingSuccess = (data) => {
  return {
    type: ActionConstants.ADD_SHIPPING_SUCCESS,
    data,
  };
};
export const addShippingError = (error) => {
  return {
    type: ActionConstants.ADD_SHIPPING_ERROR,
    error,
  };
};
