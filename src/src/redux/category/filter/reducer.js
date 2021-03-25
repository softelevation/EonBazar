import {ActionConstants} from '../../constants';

const initialList = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function filterList(state = initialList, action) {
  switch (action.type) {
    case ActionConstants.FILTER_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.FILTER_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.FILTER_CATEGORY_LIST_ERROR:
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

const initialIdState = {
  id: '',
};
export function filterIds(state = initialIdState, action) {
  switch (action.type) {
    case ActionConstants.FILTER_ID_REQUEST:
      return {
        ...state,
      };
    case ActionConstants.FILTER_ID_SUCCESS:
      return {
        ...state,
        id: action.data,
      };
    case ActionConstants.FILTER_ID_FLUSH:
      return {
        ...state,
        id: '',
      };

    default:
      return state;
  }
}
export default filterList;
