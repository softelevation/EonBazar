import {ActionConstants} from '../constants';
import {addShippingError, addShippingSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import * as RootNavigation from '../../routes/NavigationService';
import {Toast} from '../../common/toast';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(addShippingSuccess(response.data));
      RootNavigation.navigate('PaymentMethod', {
        item: action.payload,
      });
    } else {
      yield put(addShippingError(response));
    }
  } catch (err) {
    Toast(err.response.data.message);
    yield put(addShippingError(err));
  }
}

export function* shippingWatcher() {
  yield all([takeLatest(ActionConstants.ADD_SHIPPING_REQUEST, request)]);
}
export default shippingWatcher;
