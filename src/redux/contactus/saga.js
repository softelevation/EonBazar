import {ActionConstants} from '../constants';
import {contactUsError, contactUsSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Toast} from '../../common/toast';
import {light} from '../../components/theme/colors';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(contactUsSuccess(response.data));
      Toast(response.data.message);
    } else {
      yield put(contactUsError(response));
      Toast(response.data.message);
    }
  } catch (err) {
    Toast(err.response.data.message, light.danger);
    yield put(contactUsError(err));
  }
}

export function* contactWatcher() {
  yield all([takeLatest(ActionConstants.CONTACT_US_REQUEST, request)]);
}
export default contactWatcher;
