import {all} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {productsWatcher} from './category/saga';
import {getCurrencyDetailsWatcher} from './currency/currencyType/saga';
export default function* rootSaga() {
  yield all([loginWatcher(), productsWatcher(), getCurrencyDetailsWatcher()]);
}
