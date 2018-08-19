import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import apiInstance from '../../axios-test';

class GoogleAuthenticator extends Component {

    render() {

        const responseGoogle = (response) => {
            console.log(response.tokenId);
            const url = 'user/LoginGoogle';
    
            apiInstance.post(url, { userId: '', accessToken: response.tokenId })
                .then(responseApi =>{
                    console.log(responseApi);
                    localStorage.setItem('role_react', responseApi.data.role);
            });
            this.props.authenticationTokenUpdate(response.tokenId);
        }
    
        const logout = () => {
            this.props.authenticationTokenUpdate(null);
        }

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
            <GoogleLogin style={{color: 'white', backgroundColor: 'blue'}}
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
            {this.props.authenticationToken}      
            {buttonLoginLogout}
        </div>
  )
}

}

export default GoogleAuthenticator;