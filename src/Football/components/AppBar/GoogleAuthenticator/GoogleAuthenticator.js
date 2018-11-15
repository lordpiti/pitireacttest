import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import apiInstance from '../../../utilities/axios-test';
import './GoogleAuthenticator.css';

class GoogleAuthenticator extends Component {

  render() {

    const responseGoogle = (response) => {
      const url = 'user/LoginGoogle';

      apiInstance.post(url, { userId: '', accessToken: response.tokenId })
        .then(responseApi => {
          const loginData = {
            token: responseApi.data.token,
            role: responseApi.data.role,
            userName: responseApi.data.name,
            authenticationType: 2,
            avatar: response.profileObj.imageUrl
          }
          this.props.authenticationTokenUpdate(loginData);
        });
    }

    const logout = () => {
      this.props.authenticationTokenUpdate(null);
    }

    //Needed since the original logout button component has a bug
    //which prevent the user from logging out when refreshing the page
    //after logging in
    const forceMyOwnLogout = ((response) => {
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
          auth2.signOut().then(x => {
            auth2.disconnect().then(res => {
              logout();
            });
          });
        }
      }
      logout();
      this.forceUpdate()
    });

    let buttonLoginLogout = null;

    if (!this.props.authenticationToken) {
      buttonLoginLogout =
      <GoogleLogin className="googleLoginButton"
          clientId="357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
      >  <span className="loginButton google pointer" id="google-login-button"></span>
      </GoogleLogin>
    }
    else {
      if (this.props.showLogoutButton) {

        const loginImage = localStorage.getItem('loginImage_react');
        const userName = localStorage.getItem('userName_react');

        buttonLoginLogout = <div>
          <img className="loginImage" src={loginImage} />
          <span className="loginName">{userName}</span>
          <Button variant="contained" color="secondary" onClick={forceMyOwnLogout}>
            Logout
          </Button>
        </div>;
      }
    }

    return (

      <div className="padding-top-sm">
        {/* {this.props.authenticationToken}       */}
        {buttonLoginLogout}
      </div>
    )
  }

}

export default GoogleAuthenticator;