import React from 'react';
import FacebookLogin from 'react-facebook-login';
import apiInstance from '../../../utilities/axios-test';

const FacebookAuthenticator = (props) => {

  const responseFacebook = (response) => {
    console.log(response);
    const url = 'user/Login';

    apiInstance.post(url, { userId: response.userID, accessToken: response.accessToken })
      .then(responseApi => {
        //console.log(responseApi);
        props.authenticationTokenUpdate(responseApi.data.token);
        localStorage.setItem('role_react', responseApi.data.role);
        localStorage.setItem('authentication_type', 1);
      });
  }

  const componentClicked = () => {
    console.log('clicked!');
  }

  return (
    <FacebookLogin
      appId="2050633918500176"
      autoLoad={false}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook} />
  );
}

export default FacebookAuthenticator;