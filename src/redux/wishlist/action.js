import {ActionConstants} from '../constants';

// Cart Details
export const wishlistRequest = (payload) => {
  return {
    type: ActionConstants.GET_WISHLIST_REQUEST,
    payload,
  };
};
export const wishlistSuccess = (data) => {
  return {
    type: ActionConstants.GET_WISHLIST_SUCCESS,
    data,
  };
};
export const wishlistError = (error) => {
  return {
    type: ActionConstants.GET_WISHLIST_SUCCESS,
    error,
  };
};

// Add to Wishlist

export const updateWishlistRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_WISHLIST_REQUEST,
    payload,
  };
};
export const updateWishlistSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_WISHLIST_SUCCESS,
    data,
  };
};
export const updateWishlistError = (error) => {
  return {
    type: ActionConstants.UPDATE_WISHLIST_ERROR,
    error,
  };
};

export const removeWishlistRequest = (payload) => {
  return {
    type: ActionConstants.REMOVE_WISHLIST_REQUEST,
    payload,
  };
};
export const removeWishlistSuccess = (data) => {
  return {
    type: ActionConstants.REMOVE_WISHLIST_SUCCESS,
    data,
  };
};
export const removeWishlistError = (error) => {
  return {
    type: ActionConstants.REMOVE_WISHLIST_ERROR,
    error,
  };
};
