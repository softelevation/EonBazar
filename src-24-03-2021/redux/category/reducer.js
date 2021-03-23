import React from 'react';
import {combineReducers} from 'redux';
import productList from './list/reducer';
import categoryList from './details/reducer';
import {filterIds, filterList} from './filter/reducer';
import {top, best, brands} from './offers/reducer';

const product = combineReducers({
  productList,
  categoryList,
  filterList,
  filterIds,
  top,
  brands,
  best,
});
export default product;
