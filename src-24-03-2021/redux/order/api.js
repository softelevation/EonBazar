import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

export const MyOrderApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/customer/orders`,
    headers,
  });
};
