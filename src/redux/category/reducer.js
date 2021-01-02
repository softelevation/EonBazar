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
        ...initialState,
        loading: true,
      };
    case ActionConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        user: action.success,
      };
    case ActionConstants.GET_ALL_PRODUCTS_ERROR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
export default getProductsReducer;
