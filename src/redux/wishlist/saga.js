import {ActionConstants} from '../constants';
import {
  wishlistSuccess,
  wishlistError,
  updateWishlistError,
  removeWishlistSuccess,
  updateWishlistSuccess,
  wishlistRequest,
  removeWishlistError,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {ListApi, AddWishlistApi, deleteItemApi} from './api';
import * as RootNavigation from '../../routes/NavigationService';
import Toast from '../../common/toast';
export function* requestList(action) {
  try {
    const response = yield call(ListApi, action.payload);
    if (response) {
      yield put(wishlistSuccess(response.data));
    } else {
      yield put(wishlistError(response));
    }
  } catch (err) {
    yield put(wishlistError(err));
  }
}

export function* updateWishlist(action) {
  try {
    const response = yield call(AddWishlistApi, action.payload);
    if (response) {
      yield put(updateWishlistSuccess(response.data));
      RootNavigation.navigate('Wishlist');
    } else {
      yield put(updateWishlistError(response));
    }
  } catch (err) {
    // alert(err.response.data.message);
    setTimeout(() => {
      Toast.show(response.data.message);
    }, 1000);
    yield put(updateWishlistError(err.response.data.message));
  }
}

export function* deleteIem(action) {
  try {
    const response = yield call(deleteItemApi, action.payload);
    if (response) {
      yield put(removeWishlistSuccess(response.data));
      yield put(wishlistRequest());
    } else {
      yield put(removeWishlistError(response));
    }
  } catch (err) {
    yield put(removeWishlistError(err));
  }
}

export function* wishlistWatcher() {
  yield all([
    takeLatest(ActionConstants.GET_WISHLIST_REQUEST, requestList),
    takeLatest(ActionConstants.UPDATE_WISHLIST_REQUEST, updateWishlist),
    takeLatest(ActionConstants.REMOVE_WISHLIST_REQUEST, deleteIem),
  ]);
}
export default wishlistWatcher;
