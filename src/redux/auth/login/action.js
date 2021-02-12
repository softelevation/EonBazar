import {ActionConstants} from '../../constants';

export const loginRequest = (payload) => {
  return {
    type: ActionConstants.LOGIN_REQUEST,
    payload,
    res: false,
  };
};
export const loginSuccess = (data) => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    data,
    res: true,
  };
};
export const loginError = (error) => {
  return {
    type: ActionConstants.LOGIN_ERROR,
    error,
    res: false,
  };
};

export const authCheckRequest = (payload) => {
  return {
    type: ActionConstants.AUTH_CHECK_REQUEST,
    payload,
    res: false,
  };
};
export const authCheckSuccess = (data) => {
  return {
    type: ActionConstants.AUTH_CHECK_SUCCESS,
    data,
    res: true,
  };
};
export const authCheckError = (error) => {
  return {
    type: ActionConstants.AUTH_CHECK_ERROR,
    error,
    res: false,
  };
};
