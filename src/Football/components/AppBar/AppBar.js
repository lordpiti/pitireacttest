import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import GoogleLoginButton from './GoogleAuthenticator/GoogleAuthenticator';
import FacebookLoginButton from './FacebookAuthenticator/FacebookAuthenticator';
import './AppBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function ButtonAppBar(props) {
  const { classes } = props;

  const facebookAuthenticationType = localStorage.getItem('authentication_type') == '1';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <span style={{ fontSize: 'x-large', fontWeight: 'bold'}}>FootballWeb React</span>
          <Typography variant="title" color="inherit" className={classes.flex}>
            
            {/* <NavLink style={{color: 'white'}} to="/" exact>
              <Button color="inherit">Home</Button>
            </NavLink> */}
        
            <NavLink style={{color: 'white'}} to={{
                pathname: '/teams'
            }}><Button  color="inherit">Teams</Button>
            </NavLink>

            <NavLink style={{color: 'white'}} to={{
                pathname: '/competitions'
            }}><Button color="inherit">Competitions</Button>
            </NavLink>
            
            
            <NavLink style={{color: 'white'}} to={{
                  pathname: '/players'
              }}><Button color="inherit">Players</Button>
            </NavLink>
            
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <FacebookLoginButton
            authenticationToken={props.authenticationToken}
            showLogoutButton = {facebookAuthenticationType}
            authenticationTokenUpdate={(token) => props.onUpdateAuthenticationToken(token)} />
          <GoogleLoginButton
            authenticationToken={props.authenticationToken}
            showLogoutButton = {!facebookAuthenticationType}
            authenticationTokenUpdate={(token) => props.onUpdateAuthenticationToken(token)} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
