import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL+'/api/'
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token_react');
    const authenticationType = localStorage.getItem('authentication_type');

    const tokenAndType = {
        token: token,
        authenticationType: authenticationType
      };

      if (config && config.headers) {
        if (token) {
          const tokenAndTypeJSON = JSON.stringify(tokenAndType);
          (config.headers as any).common['authenticationToken'] = tokenAndTypeJSON;
        } else {
            (config.headers as any).common['authenticationToken'] = null;
            /*if setting null does not remove `Authorization` header then try     
              delete axios.defaults.headers.common['Authorization'];
            */
        }
      }


    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default instance;