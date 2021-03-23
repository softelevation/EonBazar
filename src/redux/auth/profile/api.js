import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';

export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  console.log(JSON.stringify(token))
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

export const updateApi = async (data) => {
  console.log(JSON.stringify(data))
  const token = await AsyncStorage.getItem('token');
  console.log(token)
  //alert(token)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'put',
    url: `${config.Api_Url}/V1/customers/me`,
    headers,
    data: data,
  });
};
