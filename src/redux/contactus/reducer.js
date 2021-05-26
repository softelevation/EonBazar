import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';

const initialState = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function contact(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CONTACT_US_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        isSucess: false,
      };
    case ActionConstants.CONTACT_US_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
        isSucess: true,
      };
    case ActionConstants.CONTACT_US_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSucess: false,
      };

    default:
      return state;
  }
}
const contactUs = combineReducers({
  contact,
});
export default contactUs;
