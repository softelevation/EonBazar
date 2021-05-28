import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async (data) => {
  const {name, email, telephone, comment} = data;
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/contactus?contactForm[name]=${name}&contactForm[email]=${email}&contactForm[telephone]=${telephone}&contactForm[comment]=${comment}`,
    headers,
  });
};
