import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://footballsandbox.azurewebsites.net/api/'
  //baseURL: 'http://localhost:57544/api/'
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token_react');
    const authenticationType = localStorage.getItem('authentication_type');

    const tokenAndType = {
        token: token,
        authenticationType: authenticationType
      };

    if (token) {
      const tokenAndTypeJSON = JSON.stringify(tokenAndType);
      config.headers.common['authenticationToken'] = tokenAndTypeJSON;
    } else {
        config.headers.common['authenticationToken'] = null;
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