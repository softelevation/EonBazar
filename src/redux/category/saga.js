import {ActionConstants} from '../constants';
import {getAllProductsError, getAllProductsSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(getAllProductsSuccess(response.data));
    } else {
      yield put(getAllProductsError(response));
    }
  } catch (err) {
    yield put(getAllProductsError(err));
  }
}

export function* productsWatcher() {
  yield all([takeLatest(ActionConstants.GET_ALL_PRODUCTS_REQUEST, request)]);
}
export default productsWatcher;
