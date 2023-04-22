import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/',
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token_react');
    const authenticationType = localStorage.getItem('authentication_type');

    const tokenAndType = {
      token: token,
      authenticationType: authenticationType,
    };

    if (config?.headers?.common) {
      if (token) {
        const tokenAndTypeJSON = JSON.stringify(tokenAndType);
        (config.headers.common as any).authenticationToken = tokenAndTypeJSON;
      } else {
        (config.headers.common as any).authenticationToken = null;
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
