import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/sendotp`,
    headers,
    data: {
      resend: data.resend,
      storeId: 1,
      mobile: data.mobile,
      eventType: data.eventType,
    },
  });
};
