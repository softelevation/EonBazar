import {ActionConstants} from '../../constants';

const initialList = {
  loading: false,
  data: [],
  error: '',
  isSucess: false,
};
export function categoryList(state = initialList, action) {
  switch (action.type) {
    case ActionConstants.CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSucess: false,
        error: '',
      };
    case ActionConstants.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSucess: true,
        error: '',
      };
    case ActionConstants.CATEGORY_LIST_ERROR:
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
export default categoryList;
