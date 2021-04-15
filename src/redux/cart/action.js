import {Alert} from 'react-native';
import {ActionConstants} from '../constants';

// Cart Details
export const getCartDetailsRequest = (payload) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_REQUEST,
    payload,
    loading: false,
  };
};
export const getCartDetailsSuccess = (data) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_SUCCESS,
    data,
    loading: false,
  };
};
export const getCartDetailsError = (error) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_ERROR,
    error,
    loading: false,
  };
};

// Add to cart

export const addToCartRequest = (payload) => {
  return {
    type: ActionConstants.ADD_TO_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const addToCartSuccess = (data) => {
  return {
    type: ActionConstants.ADD_TO_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const addToCartError = (error) => {
  return {
    type: ActionConstants.ADD_TO_CART_ERROR,
    error,
    loading: false,
  };
};

// Create Cart
export const createCartRequest = (payload) => {
  return {
    type: ActionConstants.CREATE_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const createCartSuccess = (data) => {
  return {
    type: ActionConstants.CREATE_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const createCartError = (error) => {
  return {
    type: ActionConstants.CREATE_CART_ERROR,
    error,
    loading: false,
  };
};

//Update Cart

export const updateCartRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const updateCartSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const updateCartError = (error) => {
  return {
    type: ActionConstants.UPDATE_CART_ERROR,
    error,
    loading: false,
  };
};

export const deleteItemRequest = (payload) => {
  return {
    type: ActionConstants.DELETE_ITEM_REQUEST,
    payload,
    loading: false,
  };
};
export const deleteItemSuccess = (data) => {
  return {
    type: ActionConstants.DELETE_ITEM_SUCCESS,
    data,
    loading: false,
  };
};
export const deleteItemError = (error) => {
  return {
    type: ActionConstants.DELETE_ITEM_SUCCESS,
    error,
    loading: false,
  };
};

// Guest cart
export const guestCartRequest = (payload) => {
  return {
    type: ActionConstants.GET_GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const guestCartSuccess = (data) => {
  return {
    type: ActionConstants.GET_GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const guestCartError = (error) => {
  return {
    type: ActionConstants.GET_GUEST_CART_ERROR,
    error,
    loading: false,
  };
};

export const addToGuestCartRequest = (payload) => {
  // alert(JSON.stringify(payload))
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const addToGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const addToGuestCartError = (error) => {
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_ERROR,
    error,
    loading: false,
  };
};

export const updateGuestCartRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const updateGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const updateGuestCartError = (error) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_SUCCESS,
    error,
    loading: false,
  };
};

export const deleteGuestCartRequest = (payload) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const deleteGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const deleteGuestCartError = (error) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_ERROR,
    error,
    loading: false,
  };
};

export const GuestCartIDRequest = (payload) => {
  return {
    type: ActionConstants.GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const GuestCartIDSuccess = (data) => {
  return {
    type: ActionConstants.GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const GuestCartIDError = (error) => {
  return {
    type: ActionConstants.GUEST_CART_SUCCESS,
    error,
    loading: false,
  };
};
export const GuestMergeRequest = (payload) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_REQUEST,
    payload,
    loading: false,
  };
};
export const GuestMergeSuccess = (data) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_SUCCESS,
    data,
    loading: false,
  };
};
export const GuestMergeError = (error) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_ERROR,
    error,
    loading: false,
  };
};
