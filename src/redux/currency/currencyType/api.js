import axios from 'axios';
import {Api_Url} from '../../../utils/config';
export const Api = async () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'get',
    url: `${Api_Url}/V1/directory/currency`,
    headers,
  });
};
