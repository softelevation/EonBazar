import {ActionConstants} from '../../constants';
import {
  loginError,
  loginSuccess,
  profileRequest,
  createCartRequest,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, authCheckApi} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {profileSuccess} from '../profile/action';

const SaveToken = async (token) => {
  return await AsyncStorage.setItem('token', token);
};
const clearGuestToken = async (token) => {
  return await AsyncStorage.removeItem('guest-token');
};
const clearAuthToken = async (token) => {
  return await AsyncStorage.removeItem('token');
};

export function* loginRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield call(SaveToken, response.data);
      yield put(loginSuccess(response.data));
      yield put(profileRequest());
      yield put(createCartRequest());
      yield call(clearGuestToken);
    } else {
      yield put(loginError(response));
    }
  } catch (err) {
    yield put(loginError('Login Failed'));
  }
}

export function* authRequest(action) {
  try {
    const response = yield call(authCheckApi, action.payload);
    if (response) {
      yield put(loginSuccess(response.data));
      yield put(profileRequest());
      yield put(createCartRequest());
      yield call(clearGuestToken);
    } else {
      yield put(loginError(response));
    }
  } catch (err) {
    yield call(clearAuthToken);
    yield put(profileSuccess({}));

    yield put(loginError());
  }
}

export function* loginWatcher() {
  yield all([
    takeLatest(ActionConstants.LOGIN_REQUEST, loginRequest),
    takeLatest(ActionConstants.AUTH_CHECK_REQUEST, authRequest),
  ]);
}
export default loginWatcher;
