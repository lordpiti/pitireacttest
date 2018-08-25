import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import apiInstance from '../../../utilities/axios-test';

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
        <GoogleLogin style={{ color: 'white', backgroundColor: 'blue' }}
          clientId="357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        ><span> Login with Google</span>
        </GoogleLogin>
    }
    else {
      buttonLoginLogout = <button onClick={forceMyOwnLogout}>Logout</button>
    }

    return (

      <div>
        {/* {this.props.authenticationToken}       */}
        {buttonLoginLogout}
      </div>
    )
  }

}

export default GoogleAuthenticator;