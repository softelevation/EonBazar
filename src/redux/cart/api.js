import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

export const CreateCartApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/carts/mine`,
    headers,
  });
};

export const ListApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/carts/mine/items`,
    headers,
  });
};

export const SaveListApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/carts/mine/items`,
    headers,
    data: {
      cartItem: data,
    },
  });
};

export const updateCartApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'put',
    url: `${config.Api_Url}/V1/carts/mine/items/${data.id}`,
    headers,
    data: {
      cartItem: data.data,
    },
  });
};

export const deleteItemApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'delete',
    url: `${config.Api_Url}/V1/carts/mine/items/${data}`,
    headers,
  });
};

// sku: data.name,
// qty: 20,
// quote_id: '3930',

//Guest Cart

export const GuestCartApi = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/guest-carts/`,
    headers,
  });
};

export const guestListApi = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/guest-carts/${token}/items`,
    headers,
  });
};

export const guestAddList = async (data) => {
  console.log(data, 'guestAddList');
  const {token, items} = data;
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/guest-carts/${token}/items`,
    headers,
    data: {
      cartItem: items,
    },
  });
};

export const guestupdateCartApi = async (data) => {
  const {token, id, items} = data;
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'put',
    url: `${config.Api_Url}/V1/guest-carts/${token}/items/${id}`,
    headers,
    data: {
      cartItem: items,
    },
  });
};

export const guestdeleteItemApi = async (data) => {
  const {token, id} = data;
  console.log(data, 'data');
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'delete',
    url: `${config.Api_Url}/V1/guest-carts/${token}/items/${id}`,
    headers,
  });
};

export const guestdMergeApi = async (data) => {
  const {token, items} = data;
  const newToken = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newToken,
  };
  return axios({
    method: 'put',
    url: `${config.Api_Url}/V1/guest-carts/${token}`,
    headers,
    data: items,
  });
};
