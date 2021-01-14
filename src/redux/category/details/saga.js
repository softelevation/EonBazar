import {ActionConstants} from '../../constants';
import {getCategoryListError, getCategoryListSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(getCategoryListSuccess(response.data.items));
    } else {
      yield put(getCategoryListError(response));
    }
  } catch (err) {
    yield put(getCategoryListError(err));
  }
}

export function* categoryWatcher() {
  yield all([takeLatest(ActionConstants.CATEGORY_LIST_REQUEST, request)]);
}
export default categoryWatcher;
