import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import apiInstance from '../../axios-test';

const googleLoginButton = ( props ) => {

    const responseGoogle = (response) => {
    console.log(response.tokenId);
    const url = 'user/LoginGoogle';

    apiInstance.post(url, { userId: '', accessToken: response.tokenId })
        .then(responseApi =>{
            console.log(responseApi);
            localStorage.setItem('role_react', responseApi.data.role);
    });
    props.authenticationTokenUpdate(response.tokenId);
    }

    const logout = (response) => {
        props.authenticationTokenUpdate(null);
    }

    let buttonLoginLogout = null;

    if (!props.authenticationToken) {
        buttonLoginLogout = 
        <GoogleLogin
            clientId="357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    }
    else {
        buttonLoginLogout = <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} onFailure={logout} />
    }

    return (
        <div>
            {props.authenticationToken}
            {buttonLoginLogout}
        </div>
  )

}

export default googleLoginButton;