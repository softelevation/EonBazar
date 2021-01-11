import {combineReducers} from 'redux';
import {loginReducer} from './auth/login/reducer';
// import {profileReducer} from './auth/profile/reducer';
import {getProductsReducer} from './category/reducer';
import {currency} from './currency/currencyType/reducer';
import user from './auth/reducer';
import currencyDetails from './currency/reducer';
import cart from './cart/reducer';
// import {getDeviceByNodeReducer} from './GetDeviceByNode/reducer';
// import {getDeviceReducer} from './GetDevice/reducer';
// import {getNotificationsReducer} from './Notifications/reducer';
// import {getAlertsReducer} from './Alerts/reducer';
// import {postCommandReducer} from './PostCommand/reducer';
// import {deleteAlertsReducer} from './Delete_Alerts/reducer';
// import {languageReducer} from './language/reducer';
// import {getDashboardReducer} from './getDashboard/reducer';
// import {deleteDashboardReducer} from './deleteDashboard/reducer';
// import {updateDashboardReducer} from './updateDashboard/reducer';
const rootreducer = combineReducers({
  getProductsReducer,
  currency,
  user,
  cart,
  currencyDetails,
  // getNodesReducer,
  // getNodesByIdReducer,
  // getDeviceByNodeReducer,
  // getDeviceReducer,
  // getNotificationsReducer,
  // getAlertsReducer,
  // postCommandReducer,
  // deleteAlertsReducer,
  // languageReducer,
  // getDashboardReducer,
  // deleteDashboardReducer,
  // updateDashboardReducer,
});
export default rootreducer;
