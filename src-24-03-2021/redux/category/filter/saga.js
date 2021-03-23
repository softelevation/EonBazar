import {ActionConstants} from '../../constants';
import {
  filterCategoryListError,
  filterCategoryListSuccess,
  filterIdSuccess,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(filterCategoryListSuccess(response.data));
    } else {
      yield put(filterCategoryListError(response));
    }
  } catch (err) {
    yield put(filterCategoryListError(err));
  }
}

export function* requestId(action) {
  yield put(filterIdSuccess(action.payload));
}
export function* requestIdFlush(action) {
  yield put(filterIdSuccess(action.payload));
}

export function* filterWatcher() {
  yield all([
    takeLatest(ActionConstants.FILTER_CATEGORY_LIST_REQUEST, request),
    takeLatest(ActionConstants.FILTER_ID_REQUEST, requestId),
    takeLatest(ActionConstants.FILTER_ID_FLUSH, requestIdFlush),
  ]);
}
export default filterWatcher;
