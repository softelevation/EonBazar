import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/integration/customer/token`,
    headers,
    data: {
      username: `${data.username}${config.domain_name}`,
      password: data.password,
      websiteId: '0',
    },
  });
};
