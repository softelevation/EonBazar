import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
};
export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.REGISTER_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case ActionConstants.REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        data: action.success,
      };
    case ActionConstants.REGISTER_ERROR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
export default registerReducer;
