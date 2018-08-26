import React from 'react';
import FacebookLogin from 'react-facebook-login';
import apiInstance from '../../../utilities/axios-test';
import Button from '@material-ui/core/Button';

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

  const logout = () => {
    props.authenticationTokenUpdate(null);
  }

  const componentClicked = () => {
    console.log('clicked!');
  }

  let buttonLoginLogout = null;

  if (!props.authenticationToken) {
    buttonLoginLogout = 
    <FacebookLogin
      appId="2050633918500176"
      autoLoad={false}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook} 
    />
  }
  else {
    if (props.showLogoutButton) {
      buttonLoginLogout = <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>;
    }
  }

  return (
    <div>{buttonLoginLogout}</div>
    
  );
}

export default FacebookAuthenticator;