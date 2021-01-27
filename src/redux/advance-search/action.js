import {ActionConstants} from '../constants';

// Cart Details
export const advanceSearchRequest = (payload) => {
  return {
    type: ActionConstants.ADVANCE_SEARCH_REQUEST,
    payload,
  };
};
export const advanceSearchSuccess = (data) => {
  return {
    type: ActionConstants.ADVANCE_SEARCH_SUCCESS,
    data,
  };
};
export const advanceSearchError = (error) => {
  return {
    type: ActionConstants.ADVANCE_SEARCH_ERROR,
    error,
  };
};
