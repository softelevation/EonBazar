import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  user: [],
  error: '',
};
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case ActionConstants.LOGIN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        user: action.success,
      };
    case ActionConstants.LOGIN_ERROR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
export default loginReducer;
