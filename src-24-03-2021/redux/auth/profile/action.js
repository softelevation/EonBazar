import {ActionConstants} from '../../constants';

export const profileRequest = (payload) => {
  return {
    type: ActionConstants.PROFILE_REQUEST,
    payload,
    res: false,
  };
};
export const profileSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_SUCCESS,
    data,
    res: true,
  };
};
export const profileError = (error) => {
  return {
    type: ActionConstants.PROFILE_ERROR,
    error,
    res: false,
  };
};
export const profileFlush = (error) => {
  return {
    type: ActionConstants.PROFILE_FLUSH,
  };
};
export const updateProfileRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_REQUEST,
    payload,
    res: false,
  };
};
export const updateProfileSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_SUCCESS,
    data,
    res: true,
  };
};
export const updateProfileError = (error) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_ERROR,
    error,
    res: false,
  };
};
