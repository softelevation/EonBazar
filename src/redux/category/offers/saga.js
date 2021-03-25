import {ActionConstants} from '../../constants';
import {
  bestOfferError,
  bestOfferSuccess,
  topOfferError,
  topOfferSuccess,
  brandOfferError,
  brandOfferSuccess,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(topOfferSuccess(response.data));
    } else {
      yield put(topOfferError(response));
    }
  } catch (err) {
    yield put(topOfferError(err));
  }
}

export function* bestrequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(bestOfferSuccess(response.data));
    } else {
      yield put(bestOfferError(response));
    }
  } catch (err) {
    yield put(bestOfferError(err));
  }
}

export function* brandrequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(brandOfferSuccess(response.data));
    } else {
      yield put(brandOfferError(response));
    }
  } catch (err) {
    yield put(brandOfferError(err));
  }
}

export function* offerWatcher() {
  yield all([
    takeLatest(ActionConstants.PRODUCTS_TOP_OFFER_REQUEST, request),
    takeLatest(ActionConstants.PRODUCTS_BEST_OFFER_REQUEST, bestrequest),
    takeLatest(ActionConstants.PRODUCTS_BRANDS_OFFER_REQUEST, brandrequest),
  ]);
}
export default offerWatcher;
