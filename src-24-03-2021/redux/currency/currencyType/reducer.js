import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function currencyDetail(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GET_CURRENCY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.GET_CURRENCY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.GET_CURRENCY_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
export default currencyDetail;
