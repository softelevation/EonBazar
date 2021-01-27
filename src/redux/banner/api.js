import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/apps/banners?searchCriteria[filter_groups][1][filters][0][field]=status&
            searchCriteria[filter_groups][1][filters][0][value]=1`,
    headers,
  });
};
