import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: [],
  error: '',
};
export function list(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.GET_WISHLIST_ERROR:
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
export function update(state = initialSaveList, action) {
  switch (action.type) {
    case ActionConstants.UPDATE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.UPDATE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.UPDATE_WISHLIST_ERROR:
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

const initialIemDeleteState = {
  loading: false,
  data: [],
  error: '',
};
export function deleteItem(state = initialIemDeleteState, action) {
  switch (action.type) {
    case ActionConstants.REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

const wishlist = combineReducers({
  list,
  update,
  deleteItem,
});
export default wishlist;
