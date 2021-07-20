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
import {Toast} from '../../common/toast';
import {light} from '../../components/theme/colors';
import {sessionExpired} from '../../utils/constants';
import {profileSuccess} from '../auth/profile/action';
import AsyncStorage from '@react-native-community/async-storage';

const clearAuthToken = async () => {
  return await AsyncStorage.removeItem('token');
};

export function* requestList(action) {
  try {
    const response = yield call(ListApi, action.payload);
    if (response) {
      yield put(wishlistSuccess(response.data));
    } else {
      yield put(wishlistError(response));
    }
  } catch (err) {
    if (err.response.status === 401 || err.response.status === 404) {
      yield call(clearAuthToken);
      yield put(profileSuccess({}));
      yield put(wishlistError(err));
      Toast(sessionExpired, light.danger);
    } else {
      yield put(wishlistError(err));
    }
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
    if (err.response.status === 401 || err.response.status === 404) {
      yield call(clearAuthToken);
      yield put(profileSuccess({}));
      yield put(updateWishlistError(err.response.data.message));
      Toast(sessionExpired, light.danger);
    } else {
      Toast(err.response.data.message, light.danger);
      yield put(updateWishlistError(err.response.data.message));
    }
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
    if (err.response.status === 401 || err.response.status === 404) {
      yield call(clearAuthToken);
      yield put(profileSuccess({}));
      yield put(removeWishlistError(err));
      Toast(sessionExpired, light.danger);
    } else {
      Toast(err.response.data.message, light.danger);
      yield put(removeWishlistError(err));
    }
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
