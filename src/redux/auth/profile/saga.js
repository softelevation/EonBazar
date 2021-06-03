import {ActionConstants} from '../../constants';
import {
  profileError,
  profileSuccess,
  GuestMergeRequest,
  updateProfileError,
  updateProfileSuccess,
} from '../../action';
import {put, call, all, takeLatest, select} from 'redux-saga/effects';
import {Api, updateApi} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {strictValidArrayWithLength} from '../../../utils/commonUtils';
import {guestCartRequest} from '../../cart/action';
import * as Navigation from '../../../routes/NavigationService';
import {Alert} from 'react-native';
import {Toast} from '../../../common/toast';
import {profileFlush} from './action';
import {loginSuccess} from '../login/action';

const getToken = async () => {
  const guest_token = await AsyncStorage.getItem('guest-token');
  return guest_token;
};
export const cartItems = (state) => state.cart.list.data;
const clearGuestToken = async () => {
  return await AsyncStorage.removeItem('guest-token');
};

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(profileSuccess(response.data));
      const token = yield call(getToken);
      let project = yield select(cartItems);
      if (token && strictValidArrayWithLength(project)) {
        yield put(
          GuestMergeRequest({
            token: token,
            items: {
              customerId: response.data.id,
              storeId: 1,
            },
          }),
          yield put(guestCartRequest()),
        );
        yield call(clearGuestToken);
      }
    } else {
      yield put(profileError(response));
    }
  } catch (err) {
    yield put(profileError(err));
  }
}

const logoutFun = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    Navigation.navigate('Login');
  } catch (error) {}
};
export function* updateRequest(action) {
  try {
    const response = yield call(updateApi, action.payload);
    if (response) {
      if (action.payload.method === 'POST') {
        yield call(logoutFun);
        yield call(profileFlush());
        yield call(loginSuccess(''));
        Toast('Your Phone Number has been changed sucessfully');
      } else {
        yield put(profileSuccess(response.data));
        Navigation.goBack();
        Toast('Your Profile has been sucessfully updated');
      }
    } else {
      yield put(profileError(response));
    }
  } catch (err) {
    yield put(profileError(err));
  }
}

export function* profileWatcher() {
  yield all([takeLatest(ActionConstants.PROFILE_REQUEST, request)]);
  yield all([
    takeLatest(ActionConstants.UPDATE_PROFILE_REQUEST, updateRequest),
  ]);
}
export default profileWatcher;
