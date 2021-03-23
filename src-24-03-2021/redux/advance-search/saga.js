import {ActionConstants} from '../constants';
import {advanceSearchError, advanceSearchSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import * as RootNavigation from '../../routes/NavigationService';
export function* requestList(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(advanceSearchSuccess(response.data));
      RootNavigation.navigate('SearchList');
    } else {
      yield put(advanceSearchError(response));
    }
  } catch (err) {
    yield put(advanceSearchError(err));
  }
}
export function* advanceSearchWatcher() {
  yield all([takeLatest(ActionConstants.ADVANCE_SEARCH_REQUEST, requestList)]);
}
export default advanceSearchWatcher;
