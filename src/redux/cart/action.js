import {ActionConstants} from '../constants';

// Cart Details
export const getCartDetailsRequest = (payload) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_REQUEST,
    payload,
  };
};
export const getCartDetailsSuccess = (data) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_SUCCESS,
    data,
  };
};
export const getCartDetailsError = (error) => {
  return {
    type: ActionConstants.GET_CART_DETAILS_ERROR,
    error,
  };
};

// Add to cart

export const addToCartRequest = (payload) => {
  return {
    type: ActionConstants.ADD_TO_CART_REQUEST,
    payload,
  };
};
export const addToCartSuccess = (data) => {
  return {
    type: ActionConstants.ADD_TO_CART_SUCCESS,
    data,
  };
};
export const addToCartError = (error) => {
  return {
    type: ActionConstants.ADD_TO_CART_ERROR,
    error,
  };
};

// Create Cart
export const createCartRequest = (payload) => {
  return {
    type: ActionConstants.CREATE_CART_REQUEST,
    payload,
  };
};
export const createCartSuccess = (data) => {
  return {
    type: ActionConstants.CREATE_CART_SUCCESS,
    data,
  };
};
export const createCartError = (error) => {
  return {
    type: ActionConstants.CREATE_CART_ERROR,
    error,
  };
};

//Update Cart

export const updateCartRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_CART_REQUEST,
    payload,
  };
};
export const updateCartSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_CART_SUCCESS,
    data,
  };
};
export const updateCartError = (error) => {
  return {
    type: ActionConstants.UPDATE_CART_ERROR,
    error,
  };
};

export const deleteItemRequest = (payload) => {
  return {
    type: ActionConstants.DELETE_ITEM_REQUEST,
    payload,
  };
};
export const deleteItemSuccess = (data) => {
  return {
    type: ActionConstants.DELETE_ITEM_SUCCESS,
    data,
  };
};
export const deleteItemError = (error) => {
  return {
    type: ActionConstants.DELETE_ITEM_SUCCESS,
    error,
  };
};

// Guest cart
export const guestCartRequest = (payload) => {
  return {
    type: ActionConstants.GET_GUEST_CART_REQUEST,
    payload,
  };
};
export const guestCartSuccess = (data) => {
  return {
    type: ActionConstants.GET_GUEST_CART_SUCCESS,
    data,
  };
};
export const guestCartError = (error) => {
  return {
    type: ActionConstants.GET_GUEST_CART_ERROR,
    error,
  };
};

export const addToGuestCartRequest = (payload) => {
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_REQUEST,
    payload,
  };
};
export const addToGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_SUCCESS,
    data,
  };
};
export const addToGuestCartError = (error) => {
  return {
    type: ActionConstants.ADD_TO_GUEST_CART_ERROR,
    error,
  };
};

export const updateGuestCartRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_REQUEST,
    payload,
  };
};
export const updateGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_SUCCESS,
    data,
  };
};
export const updateGuestCartError = (error) => {
  return {
    type: ActionConstants.UPDATE_GUEST_CART_SUCCESS,
    error,
  };
};

export const deleteGuestCartRequest = (payload) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_REQUEST,
    payload,
  };
};
export const deleteGuestCartSuccess = (data) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_SUCCESS,
    data,
  };
};
export const deleteGuestCartError = (error) => {
  return {
    type: ActionConstants.DELETE_GUEST_CART_ERROR,
    error,
  };
};

export const GuestCartIDRequest = (payload) => {
  return {
    type: ActionConstants.GUEST_CART_REQUEST,
    payload,
  };
};
export const GuestCartIDSuccess = (data) => {
  return {
    type: ActionConstants.GUEST_CART_SUCCESS,
    data,
  };
};
export const GuestCartIDError = (error) => {
  return {
    type: ActionConstants.GUEST_CART_SUCCESS,
    error,
  };
};
export const GuestMergeRequest = (payload) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_REQUEST,
    payload,
  };
};
export const GuestMergeSuccess = (data) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_SUCCESS,
    data,
  };
};
export const GuestMergeError = (error) => {
  return {
    type: ActionConstants.MERGE_GUEST_CART_ERROR,
    error,
  };
};
