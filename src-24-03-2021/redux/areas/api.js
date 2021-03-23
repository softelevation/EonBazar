import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async (data) => {
  const newtoken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newtoken,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/servicearea/districts?searchCriteria=BD`,
    headers,
    data: data,
  });
};

export const AreaApi = async (id) => {
  const newtoken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newtoken,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/servicearea/areas?searchCriteria&searchCriteria[filter_groups][0][filters][0][field]=district_id&searchCriteria[filter_groups][0][filters][0][value]=${id}`,
    headers,
  });
};
