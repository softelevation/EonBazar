import {all, call} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {profileWatcher} from './auth/profile/saga';
import {productsWatcher} from './category/list/saga';
import {getCurrencyDetailsWatcher} from './currency/currencyType/saga';
import {otpWatcher} from './auth/otp/saga';
import {registerWatcher} from './auth/register/saga';
import {cartWatcher} from './cart/saga';
import {orderWatcher} from './order/saga';
import {categoryWatcher} from './category/details/saga';
import {offerWatcher} from './category/offers/saga';
import {filterWatcher} from './category/filter/saga';
import {contactWatcher} from './contactus/saga';
import {wishlistWatcher} from './wishlist/saga';
import {bannerWatcher} from './banner/saga';
import {advanceSearchWatcher} from './advance-search/saga';
import {shippingWatcher} from './shipping/saga';
import {areaWatcher} from './areas/saga';
import {paymentWatcher} from './payment/saga';

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
    wishlistWatcher(),
    bannerWatcher(),
    advanceSearchWatcher(),
    offerWatcher(),
    shippingWatcher(),
    areaWatcher(),
    paymentWatcher(),
  ]);
}
