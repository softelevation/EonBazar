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
