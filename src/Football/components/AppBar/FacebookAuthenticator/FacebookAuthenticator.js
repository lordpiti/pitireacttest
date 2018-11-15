import React from 'react';
import FacebookLogin from 'react-facebook-login';
import apiInstance from '../../../utilities/axios-test';
import Button from '@material-ui/core/Button';
import './FacebookAuthenticator.css';

const FacebookAuthenticator = (props) => {

  const responseFacebook = (response) => {
    console.log(response);
    const url = 'user/Login';

    apiInstance.post(url, { userId: response.userID, accessToken: response.accessToken })
      .then(responseApi => {
        const loginData = {
          token: responseApi.data.token,
          role: responseApi.data.role,
          userName: responseApi.data.name,
          authenticationType: 1,
          avatar: response.picture.data.url //TODO: add profile image
        }
        props.authenticationTokenUpdate(loginData);
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
    const loginImage = localStorage.getItem('loginImage_react');
    const userName = localStorage.getItem('userName_react');
    if (props.showLogoutButton) {
      buttonLoginLogout = <div>
        <img className="loginImage" src={loginImage} />
        <span className="loginName">{userName}</span>
        <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>
        </div>;
    }
  }

  return (
    <div>{buttonLoginLogout}</div>
    
  );
}

export default FacebookAuthenticator;