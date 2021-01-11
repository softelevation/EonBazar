import {ActionConstants} from '../constants';
import {
  getCartDetailsError,
  addToCartSuccess,
  getCartDetailsSuccess,
  addToCartError,
  createCartSuccess,
  createCartError,
  updateCartSuccess,
  updateCartError,
  getCartDetailsRequest,
  deleteItemError,
  deleteItemSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {
  ListApi,
  SaveListApi,
  CreateCartApi,
  updateCartApi,
  deleteItemApi,
} from './api';
import * as RootNavigation from '../../routes/NavigationService';
export function* requestList(action) {
  try {
    const response = yield call(ListApi, action.payload);
    if (response) {
      yield put(getCartDetailsSuccess(response.data));
    } else {
      yield put(getCartDetailsError(response));
    }
  } catch (err) {
    yield put(getCartDetailsError(err));
  }
}

export function* requestSaveList(action) {
  try {
    const response = yield call(SaveListApi, action.payload);
    if (response) {
      yield put(addToCartSuccess(response.data));
      yield put(getCartDetailsRequest());
      RootNavigation.navigate('Cart');
    } else {
      yield put(addToCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(addToCartError(err.response.data.message));
  }
}

export function* createCart(action) {
  try {
    const response = yield call(CreateCartApi, action.payload);
    if (response) {
      yield put(createCartSuccess(response.data));
    } else {
      yield put(createCartError(response));
    }
  } catch (err) {
    yield put(createCartError(err));
  }
}

export function* updateCart(action) {
  try {
    const response = yield call(updateCartApi, action.payload);
    if (response) {
      yield put(updateCartSuccess(response.data));
      yield put(getCartDetailsRequest());
    } else {
      yield put(updateCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(updateCartError(err.response.data.message));
  }
}

export function* deleteIem(action) {
  try {
    const response = yield call(deleteItemApi, action.payload);
    if (response) {
      yield put(deleteItemSuccess(response.data));
      yield put(getCartDetailsRequest());
    } else {
      yield put(deleteItemError(response));
    }
  } catch (err) {
    yield put(deleteItemError(err));
  }
}

export function* cartWatcher() {
  yield all([
    takeLatest(ActionConstants.GET_CART_DETAILS_REQUEST, requestList),
    takeLatest(ActionConstants.ADD_TO_CART_REQUEST, requestSaveList),
    takeLatest(ActionConstants.CREATE_CART_REQUEST, createCart),
    takeLatest(ActionConstants.UPDATE_CART_REQUEST, updateCart),
    takeLatest(ActionConstants.DELETE_ITEM_REQUEST, deleteIem),
  ]);
}
export default cartWatcher;
