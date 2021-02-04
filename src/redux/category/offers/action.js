import {ActionConstants} from '../../constants';

// Cart Details
export const bestOfferRequest = (payload) => {
  return {
    type: ActionConstants.PRODUCTS_BEST_OFFER_REQUEST,
    payload,
  };
};
export const bestOfferSuccess = (data) => {
  return {
    type: ActionConstants.PRODUCTS_BEST_OFFER_SUCCESS,
    data,
  };
};
export const bestOfferError = (error) => {
  return {
    type: ActionConstants.PRODUCTS_BEST_OFFER_EROOR,
    error,
  };
};

export const brandOfferRequest = (payload) => {
  return {
    type: ActionConstants.PRODUCTS_BRANDS_OFFER_REQUEST,
    payload,
  };
};
export const brandOfferSuccess = (data) => {
  return {
    type: ActionConstants.PRODUCTS_BRANDS_OFFER_SUCCESS,
    data,
  };
};
export const brandOfferError = (error) => {
  return {
    type: ActionConstants.PRODUCTS_BRANDS_OFFER_ERROR,
    error,
  };
};
export const topOfferRequest = (payload) => {
  return {
    type: ActionConstants.PRODUCTS_TOP_OFFER_REQUEST,
    payload,
  };
};
export const topOfferSuccess = (data) => {
  return {
    type: ActionConstants.PRODUCTS_TOP_OFFER_SUCCESS,
    data,
  };
};
export const topOfferError = (error) => {
  return {
    type: ActionConstants.PRODUCTS_TOP_OFFER_ERROR,
    error,
  };
};
