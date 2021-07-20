import {ActionConstants} from '../constants';
import {myOrderSuccess, myOrderError} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {MyOrderApi} from './api';
import {profileError, profileSuccess} from '../auth/profile/action';
import {sessionExpired} from '../../utils/constants';
import {light} from '../../components/theme/colors';
import {Toast} from '../../common/toast';
import AsyncStorage from '@react-native-community/async-storage';

const clearAuthToken = async () => {
  return await AsyncStorage.removeItem('token');
};

export function* requestList(action) {
  try {
    const response = yield call(MyOrderApi, action.payload);
    if (response) {
      yield put(myOrderSuccess(response.data));
    } else {
      yield put(myOrderError(response));
    }
  } catch (err) {
    if (err.response.status === 401 || err.response.status === 404) {
      yield call(clearAuthToken);
      yield put(profileSuccess({}));
      yield put(myOrderError(err));
      Toast(sessionExpired, light.danger);
    } else {
      yield put(myOrderError(err));
    }
  }
}
export function* orderWatcher() {
  yield all([takeLatest(ActionConstants.MY_ORDERS_REQUEST, requestList)]);
}
export default orderWatcher;
