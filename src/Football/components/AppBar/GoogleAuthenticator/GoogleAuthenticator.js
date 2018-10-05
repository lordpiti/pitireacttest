import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import apiInstance from '../../../utilities/axios-test';
import Button from '@material-ui/core/Button';
import './GoogleAuthenticator.css';

class GoogleAuthenticator extends Component {

  render() {

    const responseGoogle = (response) => {
      //console.log(response.tokenId);
      const url = 'user/LoginGoogle';

      apiInstance.post(url, { userId: '', accessToken: response.tokenId })
        .then(responseApi => {
          //console.log(responseApi);
          this.props.authenticationTokenUpdate(responseApi.data.token);
          localStorage.setItem('role_react', responseApi.data.role);
          localStorage.setItem('authentication_type', 2);
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
        buttonLoginLogout = 
        <Button variant="contained" color="secondary" onClick={forceMyOwnLogout}>
          Logout
        </Button>;
      }
    }

    return (

      <div style={{ 'padding-top': '10px' }}>
        {/* {this.props.authenticationToken}       */}
        {buttonLoginLogout}
      </div>
    )
  }

}

export default GoogleAuthenticator;