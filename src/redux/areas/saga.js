import {ActionConstants} from '../constants';
import {
  searchDistrictError,
  searchDistrictSuccess,
  searchAreaError,
  searchAreaSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, AreaApi} from './api';
import {Alert} from 'react-native';

export function* districtRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(searchDistrictSuccess(response.data));
    } else {
      yield put(searchDistrictError(response));
    }
  } catch (err) {
    yield put(searchDistrictError(err));
  }
}

export function* cityRequest(action) {
  try {
    const response = yield call(AreaApi, action.payload);
    if (response) {
      yield put(searchAreaSuccess(response.data));
    } else {
      yield put(searchAreaError(response));
    }
  } catch (err) {
    yield put(searchAreaError(err));
  }
}

export function* areaWatcher() {
  yield all([
    takeLatest(ActionConstants.SEARCH_DISTRICT_REQUEST, districtRequest),
  ]);
  yield all([takeLatest(ActionConstants.SEARCH_AREA_REQUEST, cityRequest)]);
}
export default areaWatcher;
