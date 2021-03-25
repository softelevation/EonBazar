import {ActionConstants} from '../../constants';

// Cart Details
export const filterCategoryListRequest = (payload) => {
  return {
    type: ActionConstants.FILTER_CATEGORY_LIST_REQUEST,
    payload,
  };
};
export const filterCategoryListSuccess = (data) => {
  return {
    type: ActionConstants.FILTER_CATEGORY_LIST_SUCCESS,
    data,
  };
};
export const filterCategoryListError = (error) => {
  return {
    type: ActionConstants.FILTER_CATEGORY_LIST_ERROR,
    error,
  };
};

export const filterIdRequest = (payload) => {
  return {
    type: ActionConstants.FILTER_ID_REQUEST,
    payload,
  };
};
export const filterIdSuccess = (data) => {
  return {
    type: ActionConstants.FILTER_ID_SUCCESS,
    data,
  };
};
export const filterIdFlush = () => {
  return {
    type: ActionConstants.FILTER_ID_FLUSH,
  };
};
