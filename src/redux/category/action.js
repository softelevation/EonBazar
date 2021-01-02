import {ActionConstants} from '../constants';

const getAllProductsRequest = (payload) => {
  return {
    type: ActionConstants.GET_ALL_PRODUCTS_REQUEST,
    payload,
  };
};
const getAllProductsSuccess = (data) => {
  return {
    type: ActionConstants.GET_ALL_PRODUCTS_SUCCESS,
    data,
  };
};
const getAllProductsError = (error) => {
  return {
    type: ActionConstants.GET_ALL_PRODUCTS_ERROR,
    error,
  };
};

export {getAllProductsRequest, getAllProductsError, getAllProductsSuccess};
