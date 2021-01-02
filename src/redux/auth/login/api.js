import axios from 'axios';
export const Api = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    method: 'post',
    url: 'https://solatic.app/solatic/token',
    headers,
    data: {
      username: data.email,
      password: data.password,
      grant_type: 'password',
    },
  });
};
