import {combineReducers} from 'redux';
import user from './auth/reducer';
import currency from './currency/reducer';
import cart from './cart/reducer';
import order from './order/reducer';
import category from './category/reducer';
import {contact} from './contactus/reducer';
import wishlist from './wishlist/reducer';
const rootreducer = combineReducers({
  user,
  cart,
  order,
  currency,
  category,
  contact,
  wishlist,
});
export default rootreducer;
