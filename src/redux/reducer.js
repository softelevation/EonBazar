import {combineReducers} from 'redux';
import user from './auth/reducer';
import currency from './currency/reducer';
import cart from './cart/reducer';
import order from './order/reducer';
import category from './category/reducer';
import {contact} from './contactus/reducer';
import wishlist from './wishlist/reducer';
import banner from './banner/reducer';
import advanceSearch from './advance-search/reducer';
import shipping from './shipping/reducer';
import area from './areas/reducer';
import payment from './payment/reducer';
const rootreducer = combineReducers({
  user,
  cart,
  order,
  currency,
  category,
  contact,
  wishlist,
  banner,
  advanceSearch,
  shipping,
  area,
  payment,
});
export default rootreducer;
