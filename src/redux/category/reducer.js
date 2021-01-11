import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function getProductsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
export default getProductsReducer;
