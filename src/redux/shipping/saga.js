import {ActionConstants} from '../constants';
import {addShippingError, addShippingSuccess} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import * as RootNavigation from '../../routes/NavigationService';
import {Toast} from '../../common/toast';
import {light} from '../../components/theme/colors';
import {profileSuccess} from '../auth/profile/action';
import {sessionExpired} from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

const clearAuthToken = async () => {
  return await AsyncStorage.removeItem('token');
};

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
    if (err.response.status === 401 || err.response.status === 404) {
      yield call(clearAuthToken);
      yield put(profileSuccess({}));
      yield put(addShippingError(err));
      Toast(sessionExpired, light.danger);
    } else {
      Toast(err.response.data.message, light.danger);
      yield put(addShippingError(err));
    }
  }
}

export function* shippingWatcher() {
  yield all([takeLatest(ActionConstants.ADD_SHIPPING_REQUEST, request)]);
}
export default shippingWatcher;
