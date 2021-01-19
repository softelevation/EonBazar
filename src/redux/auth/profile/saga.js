import {ActionConstants} from '../../constants';
import {profileError, profileSuccess, GuestMergeRequest} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
  const guest_token = await AsyncStorage.getItem('guest-token');
  return guest_token;
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
}
export default profileWatcher;
