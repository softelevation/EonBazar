import {ActionConstants} from '../../constants';

// Cart Details
export const getCategoryListRequest = (payload) => {
  return {
    type: ActionConstants.CATEGORY_LIST_REQUEST,
    payload,
  };
};
export const getCategoryListSuccess = (data) => {
  return {
    type: ActionConstants.CATEGORY_LIST_SUCCESS,
    data,
  };
};
export const getCategoryListError = (error) => {
  return {
    type: ActionConstants.CATEGORY_LIST_ERROR,
    error,
  };
};
