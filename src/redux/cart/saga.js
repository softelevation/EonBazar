import {ActionConstants} from '../constants';
import {
  getCartDetailsError,
  addToCartSuccess,
  getCartDetailsSuccess,
  addToCartError,
  createCartSuccess,
  createCartError,
  updateCartSuccess,
  updateCartError,
  getCartDetailsRequest,
  deleteItemError,
  deleteItemSuccess,
  guestCartError,
  guestCartSuccess,
  GuestCartIDError,
  GuestCartIDSuccess,
  addToGuestCartError,
  addToGuestCartSuccess,
  updateGuestCartError,
  updateGuestCartSuccess,
  deleteGuestCartError,
  deleteGuestCartRequest,
  GuestMergeSuccess,
  GuestMergeError,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {
  ListApi,
  SaveListApi,
  CreateCartApi,
  updateCartApi,
  deleteItemApi,
  guestAddList,
  guestListApi,
  guestdeleteItemApi,
  guestupdateCartApi,
  GuestCartApi,
  guestdMergeApi,
} from './api';
import * as RootNavigation from '../../routes/NavigationService';
import {
  deleteGuestCartSuccess,
  GuestCartIDRequest,
  guestCartRequest,
} from './action';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export function* requestList(action) {
  try {
    const response = yield call(ListApi, action.payload);
    if (response) {
      yield put(getCartDetailsSuccess(response.data));
    } else {
      yield put(getCartDetailsError(response));
    }
  } catch (err) {
    yield put(getCartDetailsError(err));
  }
}

export function* requestSaveList(action) {
  try {
    const response = yield call(SaveListApi, action.payload);
    if (response) {
      yield put(addToCartSuccess(response.data));
      yield put(getCartDetailsRequest());
      // RootNavigation.navigate('Cart');
    } else {
      yield put(addToCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(addToCartError(err.response.data.message));
  }
}

export function* createCart(action) {
  try {
    const response = yield call(CreateCartApi, action.payload);
    console.log(response, 'response');
    console.log(response, 'response');
    if (response) {
      yield put(createCartSuccess(response.data));
    } else {
      yield put(createCartError(response));
    }
  } catch (err) {
    yield put(createCartError(err));
  }
}

export function* updateCart(action) {
  try {
    const response = yield call(updateCartApi, action.payload);
    if (response) {
      yield put(updateCartSuccess(response.data));
      yield put(getCartDetailsRequest());
    } else {
      yield put(updateCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(updateCartError(err.response.data.message));
  }
}

export function* deleteIem(action) {
  try {
    const response = yield call(deleteItemApi, action.payload);
    if (response) {
      yield put(deleteItemSuccess(response.data));
      yield put(getCartDetailsRequest());
    } else {
      yield put(deleteItemError(response));
    }
  } catch (err) {
    yield put(deleteItemError(err));
  }
}
const SaveToken = async (token) => {
  return await AsyncStorage.setItem('guest-token', token);
};
export function* guestcreateCart(action) {
  try {
    const response = yield call(GuestCartApi, action.payload);
    if (response) {
      yield put(GuestCartIDSuccess(response.data));
      yield call(SaveToken, response.data);
    } else {
      yield put(GuestCartIDError(response));
    }
  } catch (err) {
    yield put(GuestCartIDError(err));
  }
}

export function* guestrequestList(action) {
  try {
    const response = yield call(guestListApi, action.payload);
    if (response) {
      yield put(guestCartSuccess(response.data));
      yield put(getCartDetailsSuccess(response.data));
    } else {
      yield put(guestCartError(response));
      yield put(GuestCartIDRequest());
    }
  } catch (err) {
    yield put(guestCartError(err));
    yield put(GuestCartIDRequest());
  }
}

const getToken = async () => {
  const guest_token = await AsyncStorage.getItem('guest-token');
  return guest_token;
};

export function* guestSaveList(action) {
  try {
    const response = yield call(guestAddList, action.payload);
    if (response) {
      yield put(addToGuestCartSuccess(response.data));
      const token = yield call(getToken);
      if (token) {
        yield put(guestCartRequest(token));
      }

      // RootNavigation.navigate('Cart');
    } else {
      yield put(addToGuestCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(addToGuestCartError(err.response.data.message));
  }
}

export function* guestupdateCart(action) {
  try {
    const response = yield call(guestupdateCartApi, action.payload);
    if (response) {
      yield put(updateGuestCartSuccess(response.data));
      const token = yield call(getToken);
      if (token) {
        yield put(guestCartRequest(token));
      }
    } else {
      yield put(updateGuestCartError(response));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(updateGuestCartError(err.response.data.message));
  }
}

export function* guestdeleteIem(action) {
  try {
    const response = yield call(guestdeleteItemApi, action.payload);
    if (response) {
      yield put(deleteGuestCartSuccess(response.data));
      const token = yield call(getToken);
      if (token) {
        yield put(guestCartRequest(token));
      }
    } else {
      yield put(deleteGuestCartError(response));
    }
  } catch (err) {
    yield put(deleteGuestCartError(err));
  }
}

export function* guestMerge(action) {
  try {
    const response = yield call(guestdMergeApi, action.payload);
    if (response) {
      yield put(GuestMergeSuccess(response.data));
    } else {
      yield put(GuestMergeError(response));
    }
  } catch (err) {
    yield put(GuestMergeError(err));
  }
}

export function* cartWatcher() {
  yield all([
    takeLatest(ActionConstants.GET_CART_DETAILS_REQUEST, requestList),
    takeLatest(ActionConstants.ADD_TO_CART_REQUEST, requestSaveList),
    takeLatest(ActionConstants.CREATE_CART_REQUEST, createCart),
    takeLatest(ActionConstants.UPDATE_CART_REQUEST, updateCart),
    takeLatest(ActionConstants.DELETE_ITEM_REQUEST, deleteIem),

    takeLatest(ActionConstants.GUEST_CART_REQUEST, guestcreateCart),
    takeLatest(ActionConstants.GET_GUEST_CART_REQUEST, guestrequestList),
    takeLatest(ActionConstants.UPDATE_GUEST_CART_REQUEST, guestupdateCart),
    takeLatest(ActionConstants.DELETE_GUEST_CART_REQUEST, guestdeleteIem),
    takeLatest(ActionConstants.ADD_TO_GUEST_CART_REQUEST, guestSaveList),
    takeLatest(ActionConstants.MERGE_GUEST_CART_REQUEST, guestMerge),
  ]);
}
export default cartWatcher;
