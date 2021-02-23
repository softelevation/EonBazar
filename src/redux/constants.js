export const ActionConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  AUTH_CHECK_REQUEST: 'AUTH_CHECK_REQUEST',
  AUTH_CHECK_ERROR: 'AUTH_CHECK_ERROR',
  AUTH_CHECK_SUCCESS: 'AUTH_CHECK_SUCCESS',

  GUEST_CHECK_REQUEST: 'GUEST_CHECK_REQUEST',
  GUEST_CHECK_ERROR: 'GUEST_CHECK_ERROR',
  GUEST_CHECK_SUCCESS: 'GUEST_CHECK_SUCCESS',

  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_ERROR: 'REGISTER_ERROR',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',

  PROFILE_REQUEST: 'PROFILE_REQUEST',
  PROFILE_ERROR: 'PROFILE_ERROR',
  PROFILE_SUCCESS: 'PROFILE_SUCCESS',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',

  PROFILE_FLUSH: 'PROFILE_FLUSH',

  GENERATE_OTP_REQUEST: 'GENERATE_OTP_REQUEST',
  GENERATE_OTP_ERROR: 'GENERATE_OTP_ERROR',
  GENERATE_OTP_SUCCESS: 'GENERATE_OTP_SUCCESS',

  GET_ALL_PRODUCTS_REQUEST: 'GET_ALL_PRODUCTS_REQUEST',
  GET_ALL_PRODUCTS_ERROR: 'GET_ALL_PRODUCTS_ERROR',
  GET_ALL_PRODUCTS_SUCCESS: 'GET_ALL_PRODUCTS_SUCCESS',

  // Currency Details
  GET_CURRENCY_DETAILS_REQUEST: 'GET_CURRENCY_DETAILS_REQUEST',
  GET_CURRENCY_DETAILS_ERROR: 'GET_CURRENCY_DETAILS_ERROR',
  GET_CURRENCY_DETAILS_SUCCESS: 'GET_CURRENCY_DETAILS_SUCCESS',

  // Cart Details && Add to Cart

  CREATE_CART_REQUEST: 'CREATE_CART_REQUEST',
  CREATE_CART_ERROR: 'CREATE_CART_ERROR',
  CREATE_CART_SUCCESS: 'CREATE_CART_SUCCESS',

  GET_CART_DETAILS_REQUEST: 'GET_CART_DETAILS_REQUEST',
  GET_CART_DETAILS_ERROR: 'GET_CART_DETAILS_ERROR',
  GET_CART_DETAILS_SUCCESS: 'GET_CART_DETAILS_SUCCESS',

  ADD_TO_CART_REQUEST: 'ADD_TO_CART_REQUEST',
  ADD_TO_CART_ERROR: 'ADD_TO_CART_ERROR',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',

  UPDATE_CART_REQUEST: 'UPDATE_CART_REQUEST',
  UPDATE_CART_ERROR: 'UPDATE_CART_ERROR',
  UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',

  DELETE_ITEM_REQUEST: 'DELETE_ITEM_REQUEST',
  DELETE_ITEM_ERROR: 'DELETE_ITEM_ERROR',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',
  // generate
  GUEST_CART_REQUEST: 'GUEST_CART_REQUEST',
  GUEST_CART_ERROR: 'GUEST_CART_ERROR',
  GUEST_CART_SUCCESS: 'GUEST_CART_SUCCESS',
  // save in list
  ADD_TO_GUEST_CART_REQUEST: 'ADD_TO_GUEST_CART_REQUEST',
  ADD_TO_GUEST_CART_ERROR: 'ADD_TO_GUEST_CART_ERROR',
  ADD_TO_GUEST_CART_SUCCESS: 'ADD_TO_GUEST_CART_SUCCESS',
  // get from list
  GET_GUEST_CART_REQUEST: 'GET_GUEST_CART_REQUEST',
  GET_GUEST_CART_ERROR: 'GET_GUEST_CART_ERROR',
  GET_GUEST_CART_SUCCESS: 'GET_GUEST_CART_SUCCESS',
  // update in list
  UPDATE_GUEST_CART_REQUEST: 'UPDATE_GUEST_CART_REQUEST',
  UPDATE_GUEST_CART_ERROR: 'UPDATE_GUEST_CART_ERROR',
  UPDATE_GUEST_CART_SUCCESS: 'UPDATE_GUEST_CART_SUCCESS',
  // delete in list
  DELETE_GUEST_CART_REQUEST: 'DELETE_GUEST_CART_REQUEST',
  DELETE_GUEST_CART_ERROR: 'DELETE_GUEST_CART_ERROR',
  DELETE_GUEST_CART_SUCCESS: 'DELETE_GUEST_CART_SUCCESS',
  // Merge with Account
  MERGE_GUEST_CART_REQUEST: 'MERGE_GUEST_CART_REQUEST',
  MERGE_GUEST_CART_ERROR: 'MERGE_GUEST_CART_ERROR',
  MERGE_GUEST_CART_SUCCESS: 'MERGE_GUEST_CART_SUCCESS',

  //Order Details
  MY_ORDERS_REQUEST: 'MY_ORDERS_REQUEST',
  MY_ORDERS_ERROR: 'MY_ORDERS_ERROR',
  MY_ORDERS_SUCCESS: 'MY_ORDERS_SUCCESS',

  // Category List

  CATEGORY_LIST_REQUEST: 'CATEGORY_LIST_REQUEST',
  CATEGORY_LIST_SUCCESS: 'CATEGORY_LIST_SUCCESS',
  CATEGORY_LIST_ERROR: 'CATEGORY_LIST_ERROR',

  FILTER_CATEGORY_LIST_REQUEST: 'FILTER_CATEGORY_LIST_REQUEST',
  FILTER_CATEGORY_LIST_SUCCESS: 'FILTER_CATEGORY_LIST_SUCCESS',
  FILTER_CATEGORY_LIST_ERROR: 'FILTER_CATEGORY_LIST_ERROR',

  FILTER_ID_REQUEST: 'FILTER_ID_REQUEST',
  FILTER_ID_SUCCESS: 'FILTER_ID_SUCCESS',
  FILTER_ID_FLUSH: 'FILTER_ID_FLUSH',

  //Contact Us
  CONTACT_US_REQUEST: 'CONTACT_US_REQUEST',
  CONTACT_US_SUCCESS: 'CONTACT_US_SUCCESS',
  CONTACT_US_ERROR: 'CONTACT_US_ERROR',

  // WishList Constants

  GET_WISHLIST_REQUEST: 'GET_WISHLIST_REQUEST',
  GET_WISHLIST_SUCCESS: 'GET_WISHLIST_SUCCESS',
  GET_WISHLIST_ERROR: 'GET_WISHLIST_ERROR',

  UPDATE_WISHLIST_REQUEST: 'UPDATE_WISHLIST_REQUEST',
  UPDATE_WISHLIST_SUCCESS: 'UPDATE_WISHLIST_SUCCESS',
  UPDATE_WISHLIST_ERROR: 'UPDATE_WISHLIST_ERROR',

  REMOVE_WISHLIST_REQUEST: 'REMOVE_WISHLIST_REQUEST',
  REMOVE_WISHLIST_SUCCESS: 'REMOVE_WISHLIST_SUCCESS',
  REMOVE_WISHLIST_ERROR: 'REMOVE_WISHLIST_ERROR',

  //Banner Constants
  BANNER_REQUEST: 'BANNER_REQUEST',
  BANNER_SUCCESS: 'BANNER_SUCCESS',
  BANNER_ERROR: 'BANNER_ERROR',

  //Advance Search Constants
  ADVANCE_SEARCH_REQUEST: 'ADVANCE_SEARCH_REQUEST',
  ADVANCE_SEARCH_SUCCESS: 'ADVANCE_SEARCH_SUCCESS',
  ADVANCE_SEARCH_ERROR: 'ADVANCE_SEARCH_ERROR',

  PRODUCTS_TOP_OFFER_SUCCESS: 'PRODUCTS_TOP_OFFER_SUCCESS',
  PRODUCTS_TOP_OFFER_REQUEST: 'PRODUCTS_TOP_OFFER_REQUEST',
  PRODUCTS_TOP_OFFER_ERROR: 'PRODUCTS_TOP_OFFER_ERROR',

  PRODUCTS_BEST_OFFER_REQUEST: 'PRODUCTS_BEST_OFFER_REQUEST',
  PRODUCTS_BEST_OFFER_SUCCESS: 'PRODUCTS_BEST_OFFER_SUCCESS',
  PRODUCTS_BEST_OFFER_EROOR: 'PRODUCTS_BEST_OFFER_EROOR',

  PRODUCTS_BRANDS_OFFER_REQUEST: 'PRODUCTS_BRANDS_OFFER_REQUEST',
  PRODUCTS_BRANDS_OFFER_SUCCESS: 'PRODUCTS_BRANDS_OFFER_SUCCESS',
  PRODUCTS_BRANDS_OFFER_ERROR: 'PRODUCTS_BRANDS_OFFER_ERROR',

  ADD_SHIPPING_REQUEST: 'ADD_SHIPPING_REQUEST',
  ADD_SHIPPING_SUCCESS: 'ADD_SHIPPING_SUCCESS',
  ADD_SHIPPING_ERROR: 'ADD_SHIPPING_ERROR',

  SEARCH_DISTRICT_REQUEST: 'SEARCH_DISTRICT_REQUEST',
  SEARCH_DISTRICT_SUCCESS: 'SEARCH_DISTRICT_SUCCESS',
  SEARCH_DISTRICT_ERROR: 'SEARCH_DISTRICT_ERROR',

  SEARCH_AREA_REQUEST: 'SEARCH_AREA_REQUEST',
  SEARCH_AREA_SUCCESS: 'SEARCH_AREA_SUCCESS',
  SEARCH_AREA_ERROR: 'SEARCH_AREA_ERROR',

  PAYMENT_REQUEST: 'PAYMENT_REQUEST',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_ERROR: 'PAYMENT_ERROR',
};
