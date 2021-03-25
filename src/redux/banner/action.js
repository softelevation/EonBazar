import {ActionConstants} from '../constants';

// Cart Details
export const bannerRequest = (payload) => {
  return {
    type: ActionConstants.BANNER_REQUEST,
    payload,
  };
};
export const bannerSuccess = (data) => {
  return {
    type: ActionConstants.BANNER_SUCCESS,
    data,
  };
};
export const bannerError = (error) => {
  return {
    type: ActionConstants.BANNER_ERROR,
    error,
  };
};
