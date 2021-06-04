import {ActionConstants} from '../../constants';
import {generateOtpError, generateOtpSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {Alert} from 'react-native';
import {Toast} from '../../../common/toast';
import {light} from '../../../components/theme/colors';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(generateOtpSuccess(response.data));
      // Alert.alert('Please check otp on your mobile number');

      Toast('Please check otp on your mobile number');
    } else {
      yield put(generateOtpError(response));
    }
  } catch (err) {
    // Alert.alert(err.response.data.message);

    Toast(err.response.data.message, light.danger);

    yield put(generateOtpError(err));
  }
}

export function* otpWatcher() {
  yield all([takeLatest(ActionConstants.GENERATE_OTP_REQUEST, request)]);
}
export default otpWatcher;
