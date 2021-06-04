import {ActionConstants} from '../constants';

export const orientationRequest = (data) => {
  return {
    type: ActionConstants.ORIENTATION_SUCCESS,
    data,
  };
};
export const orientationError = (error) => {
  return {
    type: ActionConstants.ORIENTATION_ERROR,
    error,
  };
};
