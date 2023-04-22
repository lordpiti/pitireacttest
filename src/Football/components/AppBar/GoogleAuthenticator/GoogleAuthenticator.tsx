import React from 'react';
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import axiosInstance from 'axios';
import './GoogleAuthenticator.scss';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

interface OwnProps {
  authenticationTokenUpdate: Function;
  authenticationToken: string | null;
  showLogoutButton: boolean;
}

type GoogleAuthenticatorProps = OwnProps & WithTranslation;

const GoogleAuthenticator = (props: GoogleAuthenticatorProps) => {

  const responseGoogle = (
    response: CredentialResponse
  ) => {
    const url = `${import.meta.env.VITE_LOGIN_API_URL}/user/LoginGoogle`;

    axiosInstance
      .post(url, {
        userId: '',
        accessToken: response.credential,
      })
      .then((responseApi) => {
        const loginData = {
          token: responseApi.data.token,
          role: responseApi.data.role,
          userName: responseApi.data.name,
          authenticationType: 2,
          // avatar: (response as GoogleLoginResponse).profileObj.imageUrl,
        };
        props.authenticationTokenUpdate(loginData);
      });
  };

  const logout = () => {
    googleLogout();
    props.authenticationTokenUpdate(null);
  };

  if (!props.authenticationToken) {
    return (
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
  } else {
    if (props.showLogoutButton) {
      const loginImage = localStorage.getItem('loginImage_react') || '';
      const userName = localStorage.getItem('userName_react');

      return (
        <>
          <img className='loginImage' src={loginImage} />
          <span className='loginName'>{userName}</span>
          <Button
            variant='contained'
            color='secondary'
            onClick={logout}
          >
            Logout
          </Button>
        </>
      );
    }
  }
  return null;
}

// Example of use of the withTranslation HOC
export default withTranslation()(GoogleAuthenticator);
