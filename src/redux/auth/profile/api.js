import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';

export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/customers/me`,
    headers,
  });
};

export const updateApi = async ({data, type, method}) => {
  //alert(type)
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: method,
    url: `${config.Api_Url_all}/V1/${type}`,
    headers,
    data: data,
  });
};
