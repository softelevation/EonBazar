import {ActionConstants} from '../constants';
import {paymentError, paymentSuccess, createCartRequest} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import * as RootNavigation from '../../routes/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from '../../common/toast';

export function* paymentRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(paymentSuccess(response.data));
      if (action.payload.method === 'sslcommerz') {
        RootNavigation.navigate('Payment');
      } else {
        RootNavigation.navigate('YourOrder');
        yield put(createCartRequest());
      }
    } else {
      yield put(paymentError(response));
    }
  } catch (err) {
    // Alert.alert(err.response.data.message);
    
    setTimeout(() => {
      Toast.show(response.data.message);
    }, 1000);
    yield put(paymentError(err));
  }
}

export function* paymentWatcher() {
  yield all([takeLatest(ActionConstants.PAYMENT_REQUEST, paymentRequest)]);
}
export default paymentWatcher;
