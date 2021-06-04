import {ActionConstants} from '../constants';
import {paymentError, paymentSuccess, createCartRequest} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import * as RootNavigation from '../../routes/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import {Toast} from '../../common/toast';
import {light} from '../../components/theme/colors';
import {orientationRequest} from '../orientation/action';

export function* paymentRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(paymentSuccess(response.data));
      if (action.payload.method === 'sslcommerz') {
        RootNavigation.navigate('Payment');
        yield put(orientationRequest(true));
      } else {
        RootNavigation.navigate('PaymentSuccess');
        yield put(createCartRequest());
      }
    } else {
      RootNavigation.navigate('PaymentError');
      yield put(orientationRequest(false));
      yield put(paymentError(response));
    }
  } catch (err) {
    Toast(err.response.data.message, light.danger);
    yield put(orientationRequest(false));
    yield put(paymentError(err));
  }
}

export function* paymentWatcher() {
  yield all([takeLatest(ActionConstants.PAYMENT_REQUEST, paymentRequest)]);
}
export default paymentWatcher;
