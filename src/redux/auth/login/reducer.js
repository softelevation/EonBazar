import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  user: '',
  error: '',
};
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case ActionConstants.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionConstants.AUTH_CHECK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.AUTH_CHECK_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case ActionConstants.AUTH_CHECK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case ActionConstants.GUEST_CHECK_REQUEST:
      return {
        ...state,
      };
    case ActionConstants.GUEST_CHECK_SUCCESS:
      return {
        ...state,
      };
    case ActionConstants.GUEST_CHECK_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
export default loginReducer;
