import {ActionConstants} from '../../constants';

const loginRequest = (payload) => {
  return {
    type: ActionConstants.LOGIN_REQUEST,
    payload,
  };
};
const loginSuccess = (data) => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    data,
  };
};
const loginError = (error) => {
  return {
    type: ActionConstants.LOGIN_ERROR,
    error,
  };
};

export {loginRequest, loginError, loginSuccess};
