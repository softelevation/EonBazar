import {ActionConstants} from '../../constants';
import {
  loginError,
  loginSuccess,
  profileRequest,
  createCartRequest,
  guestCheckError,
  authCheckError,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, authCheckApi, guestCheckApi} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {profileSuccess} from '../profile/action';
import {authCheckSuccess, guestCheckSuccess} from './action';

const SaveToken = async (token) => {
  return await AsyncStorage.setItem('token', token);
};
const clearGuestToken = async () => {
  return await AsyncStorage.removeItem('guest-token');
};
const clearAuthToken = async () => {
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
      console.log('verified user token');
      yield put(loginSuccess(response.data));
      yield put(profileRequest());
      yield put(createCartRequest());
      // yield call(clearGuestToken);
      yield put(authCheckSuccess(response));
    } else {
      yield put(authCheckError(response));
    }
  } catch (err) {
    yield call(clearAuthToken);
    yield put(profileSuccess({}));
    console.log('clear user token');
    yield put(authCheckError());
  }
}
export function* gusetRequest() {
  try {
    const response = yield call(guestCheckApi);
    if (response) {
      console.log('verified guest token');
      yield put(guestCheckSuccess(response));
    } else {
      yield put(guestCheckError(response));
    }
  } catch (err) {
    console.log('clear guest token');
    // yield call(clearGuestToken);
    yield put(guestCheckError());
  }
}

export function* loginWatcher() {
  yield all([
    takeLatest(ActionConstants.LOGIN_REQUEST, loginRequest),
    takeLatest(ActionConstants.AUTH_CHECK_REQUEST, authRequest),
    takeLatest(ActionConstants.GUEST_CHECK_REQUEST, gusetRequest),
  ]);
}
export default loginWatcher;
