import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://footballpitiapi.azurewebsites.net/api/'
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token_react');

    const tokenAndType = {
        token: token,
        authenticationType: 2
      };

    if (token) {
      const tokenAndTypeJSON = JSON.stringify(tokenAndType);
      instance.defaults.headers.common['authenticationToken'] = tokenAndTypeJSON;
    } else {
        instance.defaults.headers.common['authenticationToken'] = null;
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
    }
    

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default instance;