import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async (data) => {
  const {po_number, agreement_id, method} = data;
  const newtoken = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newtoken,
  };
  return axios({
    method: 'post',
    url: 'http://stage.eonbazar.com/rest/V1/carts/mine/payment-information ',
    headers,
    data: {
      paymentMethod: {
        po_number: po_number,
        method: method,
        extension_attributes: {agreement_ids: [agreement_id]},
      },
    },
  });
};
