import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

// export const CreateCartApi = async (data) => {
//   const token = await AsyncStorage.getItem('token');
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + token,
//   };
//   return axios({
//     method: 'post',
//     url: `${config.Api_Url}/V1/carts/mine`,
//     headers,
//   });
// };

export const ListApi = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/wishlist/items`,
    headers,
  });
};

export const AddWishlistApi = async (productId) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/wishlist/add/${productId}`,
    headers,
  });
};

export const deleteItemApi = async (wishlistItemId) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'delete',
    url: `${config.Api_Url}/V1/wishlist/delete/${wishlistItemId}`,
    headers,
  });
};
