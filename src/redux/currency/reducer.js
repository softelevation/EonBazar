import React from 'react';
import {combineReducers} from 'redux';
import currency from './currencyType/reducer';

const mainDetails = combineReducers({
  currency,
});
export default mainDetails;
