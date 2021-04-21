import {Alert} from 'react-native';
import {ActionConstants} from '../../constants';
import {registerError, registerSuccess, loginSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import * as navigation from '../../../routes/NavigationService';
import {loginRequest} from '../login/action';
import Toast from '../../../common/toast';
export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(registerSuccess(response.data));
      navigation.navigate('Dashboard');
      const data = {
        username: action.payload.mobile,
        password: action.payload.password,
      };
      yield put(loginRequest(data));
      // Alert.alert('User created Sucessfully');
      setTimeout(() => {
        Toast.show('User created Sucessfully');
      }, 1000);
    } else {
      yield put(registerError(response));
    }
  } catch (err) {
    // Alert.alert(err.response.data.message);
    setTimeout(() => {
      Toast.show(err.response.data.message);
    }, 1000);
    yield put(registerError(err));
  }
}

export function* registerWatcher() {
  yield all([takeLatest(ActionConstants.REGISTER_REQUEST, request)]);
}
export default registerWatcher;
