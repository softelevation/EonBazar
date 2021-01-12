import React from 'react';
import {combineReducers} from 'redux';
import productList from './list/reducer';
import categoryList from './details/reducer';

const product = combineReducers({
  productList,
  categoryList,
});
export default product;
