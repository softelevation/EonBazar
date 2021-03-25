import {ActionConstants} from '../constants';

// Cart Details
export const contactUsRequest = (payload) => {
  return {
    type: ActionConstants.CONTACT_US_REQUEST,
    payload,
  };
};
export const contactUsSuccess = (data) => {
  return {
    type: ActionConstants.CONTACT_US_SUCCESS,
    data,
  };
};
export const contactUsError = (error) => {
  return {
    type: ActionConstants.CONTACT_US_SUCCESS,
    error,
  };
};
