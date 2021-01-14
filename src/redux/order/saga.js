import {ActionConstants} from '../constants';
import {myOrderSuccess, myOrderError} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {MyOrderApi} from './api';
export function* requestList(action) {
  try {
    const response = yield call(MyOrderApi, action.payload);
    if (response) {
      yield put(myOrderSuccess(response.data));
    } else {
      yield put(myOrderError(response));
    }
  } catch (err) {
    yield put(myOrderError(err));
  }
}
export function* orderWatcher() {
  yield all([takeLatest(ActionConstants.MY_ORDERS_REQUEST, requestList)]);
}
export default orderWatcher;
