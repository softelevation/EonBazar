import {ActionConstants} from '../../constants';

const getCurrencyDetailsRequest = (payload) => {
  return {
    type: ActionConstants.GET_CURRENCY_DETAILS_REQUEST,
    payload,
  };
};
const getCurrencyDetailsSuccess = (data) => {
  return {
    type: ActionConstants.GET_CURRENCY_DETAILS_SUCCESS,
    data,
  };
};
const getCurrencyDetailsError = (error) => {
  return {
    type: ActionConstants.GET_CURRENCY_DETAILS_ERROR,
    error,
  };
};

export {
  getCurrencyDetailsRequest,
  getCurrencyDetailsError,
  getCurrencyDetailsSuccess,
};
