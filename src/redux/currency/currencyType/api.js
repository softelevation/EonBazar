import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/directory/currency`,
    headers,
  });
};
