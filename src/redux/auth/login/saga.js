import {ActionConstants} from '../../constants';
import {
  loginError,
  loginSuccess,
  profileRequest,
  createCartRequest,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import AsyncStorage from '@react-native-community/async-storage';

const SaveToken = async (token) => {
  return await AsyncStorage.setItem('token', token);
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

export function* loginWatcher() {
  yield all([takeLatest(ActionConstants.LOGIN_REQUEST, loginRequest)]);
}
export default loginWatcher;
