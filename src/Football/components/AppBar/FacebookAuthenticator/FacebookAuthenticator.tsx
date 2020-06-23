import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axiosInstance from 'axios';
import Button from '@material-ui/core/Button';
import './FacebookAuthenticator.scss';

const FacebookAuthenticator = (props: any) => {
  const responseFacebook = (response: any) => {
    const url = `${process.env.REACT_APP_LOGIN_API_URL}/user/Login`;
    // const url = `http://localhost:3001/user/Login`;

    axiosInstance
      .post(url, { userId: response.userID, accessToken: response.accessToken })
      .then((responseApi) => {
        const loginData = {
          token: responseApi.data.token,
          role: responseApi.data.role,
          userName: responseApi.data.name,
          authenticationType: 1,
          avatar: response.picture.data.url,
        };
        props.authenticationTokenUpdate(loginData);
      });
  };

  const logout = () => {
    props.authenticationTokenUpdate(null);
  };

  const componentClicked = () => {
    console.log('clicked!');
  };

  let buttonLoginLogout = null;

  if (!props.authenticationToken) {
    buttonLoginLogout = (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
        autoLoad={false}
        fields='name,email,picture'
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  } else {
    const loginImage = localStorage.getItem('loginImage_react') || '';
    const userName = localStorage.getItem('userName_react');
    if (props.showLogoutButton) {
      buttonLoginLogout = (
        <div>
          <img className='loginImage' src={loginImage} />
          <span className='loginName'>{userName}</span>
          <Button variant='contained' color='secondary' onClick={logout}>
            Logout
          </Button>
        </div>
      );
    }
  }

  return <div>{buttonLoginLogout}</div>;
};

export default FacebookAuthenticator;
