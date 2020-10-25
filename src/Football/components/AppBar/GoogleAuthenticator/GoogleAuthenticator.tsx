import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import axiosInstance from 'axios';
import './GoogleAuthenticator.css';
import { withTranslation, WithTranslation } from 'react-i18next';

interface OwnProps {
  authenticationTokenUpdate: Function;
  authenticationToken: string | null;
  showLogoutButton: boolean;
}

type GoogleAuthenticatorProps = OwnProps & WithTranslation;

class GoogleAuthenticator extends Component<GoogleAuthenticatorProps> {
  render() {
    const { t, i18n } = this.props;
    const responseGoogle = (response: any) => {
      const url = `${process.env.REACT_APP_LOGIN_API_URL}/user/LoginGoogle`;
      // const url = `http://localhost:3001/user/LoginGoogle`;

      axiosInstance
        .post(url, { userId: '', accessToken: response.tokenId })
        .then((responseApi) => {
          const loginData = {
            token: responseApi.data.token,
            role: responseApi.data.role,
            userName: responseApi.data.name,
            authenticationType: 2,
            avatar: response.profileObj.imageUrl,
          };
          this.props.authenticationTokenUpdate(loginData);
        });
    };

    const logout = () => {
      this.props.authenticationTokenUpdate(null);
    };

    //Needed since the original logout button component has a bug
    //which prevent the user from logging out when refreshing the page
    //after logging in
    const forceMyOwnLogout = (response: any) => {
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
          auth2.signOut().then((x: any) => {
            auth2.disconnect().then((res: any) => {
              logout();
            });
          });
        }
      }
      logout();
      this.forceUpdate();
    };

    let buttonLoginLogout = null;

    if (!this.props.authenticationToken) {
      buttonLoginLogout = (
        <GoogleLogin
          className='googleLoginButton'
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        >
          {' '}
          <span
            className='loginButton google pointer'
            id='google-login-button'
          ></span>
        </GoogleLogin>
      );
    } else {
      if (this.props.showLogoutButton) {
        const loginImage = localStorage.getItem('loginImage_react') || '';
        const userName = localStorage.getItem('userName_react');

        buttonLoginLogout = (
          <div>
            <img className='loginImage' src={loginImage} />
            <span className='loginName'>{userName}</span>
            <Button
              variant='contained'
              color='secondary'
              onClick={forceMyOwnLogout}
            >
              Logout
            </Button>
          </div>
        );
      }
    }

    return <div>{buttonLoginLogout}</div>;
  }
}

// Example of use of the withTranslation HOC
export default withTranslation()(GoogleAuthenticator);
