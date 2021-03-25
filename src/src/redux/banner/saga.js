import {ActionConstants} from '../constants';
import {bannerError, bannerSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
export function* requestList(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(bannerSuccess(response.data));
    } else {
      yield put(bannerError(response));
    }
  } catch (err) {
    yield put(bannerError(err));
  }
}
export function* bannerWatcher() {
  yield all([takeLatest(ActionConstants.BANNER_REQUEST, requestList)]);
}
export default bannerWatcher;
