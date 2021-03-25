import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';

const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function contact(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CONTACT_US_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.CONTACT_US_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
      };
    case ActionConstants.CONTACT_US_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
const contactUs = combineReducers({
  contact,
});
export default contactUs;
