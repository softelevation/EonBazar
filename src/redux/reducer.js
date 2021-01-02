import {combineReducers} from 'redux';
import {loginReducer} from './auth/login/reducer';
import {getProductsReducer} from './category/reducer';
import {getCurrencyDetailsReducer} from './currency/currencyType/reducer';
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
  loginReducer,
  getProductsReducer,
  getCurrencyDetailsReducer,
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
