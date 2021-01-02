import axios from 'axios';
import {Api_Url} from '../../../utils/config';
export const Api = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${Api_Url}`,
    headers,
    data: {
      username: data.email,
      password: data.password,
      grant_type: 'password',
    },
  });
};
