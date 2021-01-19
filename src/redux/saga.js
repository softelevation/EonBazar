import {all} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {profileWatcher} from './auth/profile/saga';
import {productsWatcher} from './category/list/saga';
import {getCurrencyDetailsWatcher} from './currency/currencyType/saga';
import {otpWatcher} from './auth/otp/saga';
import {registerWatcher} from './auth/register/saga';
import {cartWatcher} from './cart/saga';
import {orderWatcher} from './order/saga';
import {categoryWatcher} from './category/details/saga';
import {filterWatcher} from './category/filter/saga';
import {contactWatcher} from './contactus/saga';
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    productsWatcher(),
    getCurrencyDetailsWatcher(),
    profileWatcher(),
    registerWatcher(),
    otpWatcher(),
    cartWatcher(),
    orderWatcher(),
    categoryWatcher(),
    filterWatcher(),
    contactWatcher(),
  ]);
}
