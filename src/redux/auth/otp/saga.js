import {ActionConstants} from '../../constants';
import {generateOtpError, generateOtpSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import {Toast} from '../../../common/toast';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(generateOtpSuccess(response.data));
      // Alert.alert('Please check otp on your mobile number');
      setTimeout(() => {
        Toast('Please check otp on your mobile number');
      }, 1000);
    } else {
      yield put(generateOtpError(response));
    }
  } catch (err) {
    // Alert.alert(err.response.data.message);
    setTimeout(() => {
      Toast(err.response.data.message);
    }, 1000);
    yield put(generateOtpError(err));
  }
}

export function* otpWatcher() {
  yield all([takeLatest(ActionConstants.GENERATE_OTP_REQUEST, request)]);
}
export default otpWatcher;
