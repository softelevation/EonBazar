import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async (data) => {
  const {name, fromPrice, toPrice} = data;
  const gtcondition = toPrice ? 'to' : 'gt';
  const newToken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newToken,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/products?searchCriteria[filter_groups][1][filters][0][field]=status&searchCriteria[filter_groups][1][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${name}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like&searchCriteria[filter_groups][2][filters][0][field]=price&searchCriteria[filter_groups][2][filters][0][value]=${fromPrice}&searchCriteria[filter_groups][2][filters][0][condition_type]=from&searchCriteria[filter_groups][3][filters][0][field]=price&searchCriteria[filter_groups][3][filters][0][value]=${toPrice}&searchCriteria[filter_groups][3][filters][0][condition_type]=${gtcondition}`,
    headers,
  });
};
