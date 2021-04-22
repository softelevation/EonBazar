import {ActionConstants} from '../constants';
import {contactUsError, contactUsSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import Toast from '../../common/toast';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(contactUsSuccess(response.data));
      setTimeout(() => {
        Toast.show(response.data.message);
      }, 1000);
      // Alert.alert(response.data.message);
    } else {
      yield put(contactUsError(response));
    }
  } catch (err) {
    yield put(contactUsError(err));
  }
}

export function* contactWatcher() {
  yield all([takeLatest(ActionConstants.CONTACT_US_REQUEST, request)]);
}
export default contactWatcher;
