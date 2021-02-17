import {ActionConstants} from '../constants';
import {paymentError, paymentSuccess, createCartRequest} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import * as RootNavigation from '../../routes/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

const clearPersistToken = async () => {
  return await AsyncStorage.removeItem('persist: root');
};

export function* paymentRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(paymentSuccess(response.data));
      yield call(clearPersistToken);
      yield put(createCartRequest());

      RootNavigation.navigate('YourOrder');
    } else {
      yield put(paymentError(response));
    }
  } catch (err) {
    Alert.alert(err.response.data.message);
    yield put(paymentError(err));
  }
}

export function* paymentWatcher() {
  yield all([takeLatest(ActionConstants.PAYMENT_REQUEST, paymentRequest)]);
}
export default paymentWatcher;