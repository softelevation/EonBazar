import {ActionConstants} from '../../constants';
import {
  profileError,
  profileSuccess,
  GuestMergeRequest,
  updateProfileError,
  updateProfileSuccess,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, updateApi} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const getToken = async () => {
  const guest_token = await AsyncStorage.getItem('guest-token');
  return guest_token;
};

const clearGuestToken = async () => {
  return await AsyncStorage.removeItem('guest-token');
};

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(profileSuccess(response.data));
      const token = yield call(getToken);
      if (token) {
        yield put(
          GuestMergeRequest({
            token: token,
            items: {
              customerId: response.data.id,
              storeId: 1,
            },
          }),
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
export function* updateRequest(action) {
  try {
    const response = yield call(updateApi, action.payload);
    if (response) {
      yield put(profileSuccess(response.data));
     // Alert.alert('Your Profile has been sucessfully updated');
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
