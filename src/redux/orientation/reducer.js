import {ActionConstants} from '../constants';
const initialListState = {
  loading: false,
  data: false,
  error: '',
};
export function orientation(state = initialListState, action) {
  switch (action.type) {
    case ActionConstants.ORIENTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.ORIENTATION_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
export default orientation;
