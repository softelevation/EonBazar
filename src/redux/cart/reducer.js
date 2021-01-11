import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: [],
  error: '',
};
export function list(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.GET_CART_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.GET_CART_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.GET_CART_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
const initialSaveList = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function save(state = initialSaveList, action) {
  switch (action.type) {
    case ActionConstants.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.ADD_TO_CART_ERROR:
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

const initialCartState = {
  loading: false,
  id: '',
  error: '',
};
export function cartId(state = initialCartState, action) {
  switch (action.type) {
    case ActionConstants.CREATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CREATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.data,
      };
    case ActionConstants.CREATE_CART_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

const initialCartUpdateState = {
  loading: false,
  update: [],
  error: '',
};
export function updateCart(state = initialCartUpdateState, action) {
  switch (action.type) {
    case ActionConstants.UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionConstants.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        update: action.data,
        error: '',
      };
    case ActionConstants.UPDATE_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const initialIemDeleteState = {
  loading: false,
  data: [],
  error: '',
};
export function deleteItem(state = initialIemDeleteState, action) {
  switch (action.type) {
    case ActionConstants.DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.DELETE_ITEM_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

const cart = combineReducers({
  list,
  save,
  cartId,
  updateCart,
  deleteItem,
});
export default cart;
