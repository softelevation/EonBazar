import {combineReducers} from 'redux';
import user from './auth/reducer';
import currency from './currency/reducer';
import cart from './cart/reducer';
import order from './order/reducer';
import category from './category/reducer';
const rootreducer = combineReducers({
  user,
  cart,
  order,
  currency,
  category,
});
export default rootreducer;
