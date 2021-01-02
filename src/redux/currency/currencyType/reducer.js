import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function getCurrencyDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GET_CURRENCY_DETAILS_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case ActionConstants.GET_CURRENCY_DETAILS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        user: action.success,
      };
    case ActionConstants.GET_CURRENCY_DETAILS_ERROR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
export default getCurrencyDetailsReducer;
