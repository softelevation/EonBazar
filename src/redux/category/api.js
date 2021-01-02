import axios from 'axios';
import {Api_Url} from '../../utils/config';
export const Api = async (data) => {
  const storeId = 'storeId';
  const country = 'IN';
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'get',
    url: `${Api_Url}/CountryCode=${country}&storeId=${storeId}`,
    headers,
  });
};
