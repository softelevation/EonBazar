import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (data) => {
  const storeId = 1;
  const country = 'BDT';
  const currentPage = data.currentPage;
  const pageSize = data.pageSize;
  const newToken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newToken,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/V1/products?storeId=${storeId}&currencyCode=${country}&searchCriteria[currentPage]=${currentPage}&searchCriteria[pageSize]=${pageSize}&searchCriteria[filter_groups][1][filters][0][field]=status&searchCriteria[filter_groups][1][filters][0][value]=1&searchCriteria[filter_groups][1][filters][0][condition_type]=eq&searchCriteria[filter_groups][1][filters][0][field]=status&searchCriteria[filter_groups][1][filters][0][value]=1`,
    headers,
  });
};

// searchCriteria[pageSize] = 10 & searchCriteria[currentPage] = 1 & storeId = 1 &
// currencyCode = BD & searchCriteria[filterGroups][0][filters][0][field] = price &
// searchCriteria[filterGroups][0][filters][0][conditionType] = lt &
// searchCriteria[filterGroups][0][filters][0][value] = 100 &
// searchCriteria[sortOrders][0][field] = name &
// searchCriteria[sortOrders][0][direction] = ASC;
