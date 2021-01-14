import {combineReducers} from 'redux';
import {getProductsReducer} from './category/reducer';
import {currency} from './currency/currencyType/reducer';
import user from './auth/reducer';
import currencyDetails from './currency/reducer';
import cart from './cart/reducer';
import order from './order/reducer';
const rootreducer = combineReducers({
  getProductsReducer,
  currency,
  user,
  cart,
  currencyDetails,
  order,
});
export default rootreducer;
