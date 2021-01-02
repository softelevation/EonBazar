import {ActionConstants} from '../../constants';
import {getCurrencyDetailsError, getCurrencyDetailsSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(getCurrencyDetailsSuccess(response.data));
    } else {
      yield put(getCurrencyDetailsError(response));
    }
  } catch (err) {
    yield put(getCurrencyDetailsError(err));
  }
}

export function* getCurrencyDetailsWatcher() {
  yield all([
    takeLatest(ActionConstants.GET_CURRENCY_DETAILS_REQUEST, request),
  ]);
}
export default getCurrencyDetailsWatcher;
