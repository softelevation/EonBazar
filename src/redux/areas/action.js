import {ActionConstants} from '../constants';

// District Details
export const searchDistrictRequest = (payload) => {
  return {
    type: ActionConstants.SEARCH_DISTRICT_REQUEST,
    payload,
  };
};
export const searchDistrictSuccess = (data) => {
  return {
    type: ActionConstants.SEARCH_DISTRICT_SUCCESS,
    data,
  };
};
export const searchDistrictError = (error) => {
  return {
    type: ActionConstants.SEARCH_DISTRICT_ERROR,
    error,
  };
};

// Area

export const searchAreaRequest = (payload) => {
  return {
    type: ActionConstants.SEARCH_AREA_REQUEST,
    payload,
  };
};
export const searchAreaSuccess = (data) => {
  return {
    type: ActionConstants.SEARCH_AREA_SUCCESS,
    data,
  };
};
export const searchAreaError = (error) => {
  return {
    type: ActionConstants.SEARCH_AREA_ERROR,
    error,
  };
};
