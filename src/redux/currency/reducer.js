import React from 'react';
import {combineReducers} from 'redux';
import currencyDetail from './currencyType/reducer';

const mainDetails = combineReducers({
  currencyDetail,
});
export default mainDetails;
