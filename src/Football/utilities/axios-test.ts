import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}api/`,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    debugger;
    const token = localStorage.getItem('token_react');
    const authenticationType = localStorage.getItem('authentication_type');

    const tokenAndType = {
      token: token,
      authenticationType: authenticationType,
    };

    if (token) {
      const tokenAndTypeJSON = JSON.stringify(tokenAndType);
      config.headers['authenticationToken'] = tokenAndTypeJSON;
    } else {
      config.headers['authenticationToken'] = '';
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
