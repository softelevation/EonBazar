import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';

export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const newToken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newToken,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/eonb/categories?rootCategoryId=2&searchCriteria[filter_groups][1][filters][0][field]=status&searchCriteria[filter_groups][1][filters][0][value]=1`,
    headers,
  });
};
