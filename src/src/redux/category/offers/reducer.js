import {ActionConstants} from '../../constants';

const initialList = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function top(state = initialList, action) {
  switch (action.type) {
    case ActionConstants.PRODUCTS_TOP_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.PRODUCTS_TOP_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.PRODUCTS_TOP_OFFER_ERROR:
      return {
        ...state,
        loading: false,
        isSucess: false,
        error: action.error,
      };

    default:
      return state;
  }
}
const initialBest = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function best(state = initialBest, action) {
  switch (action.type) {
    case ActionConstants.PRODUCTS_BEST_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.PRODUCTS_BEST_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.PRODUCTS_BEST_OFFER_EROOR:
      return {
        ...state,
        loading: false,
        isSucess: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const initialBrands = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function brands(state = initialBrands, action) {
  switch (action.type) {
    case ActionConstants.PRODUCTS_BRANDS_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.PRODUCTS_BRANDS_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.PRODUCTS_BRANDS_OFFER_ERROR:
      return {
        ...state,
        loading: false,
        isSucess: false,
        error: action.error,
      };

    default:
      return state;
  }
}
