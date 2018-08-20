import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../../Authentication/GoogleAuthenticator';

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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Button color="inherit">
                <Link style={{color: 'white'}} to="/">Home</Link>
            </Button>

            <Button  color="inherit">
                <Link style={{color: 'white'}} to={{
                    pathname: '/teams'
                }}>Teams</Link>
            </Button>

            <Button color="inherit">
                <Link style={{color: 'white'}} to={{
                    pathname: '/competitions'
                }}>Competitions</Link>
            </Button>
            <Button color="inherit">
                <Link style={{color: 'white'}} to={{
                    pathname: '/players'
                }}>Players</Link>
            </Button>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <GoogleLoginButton
              authenticationToken={props.authenticationToken}
              authenticationTokenUpdate={(token) => props.onUpdateAuthenticationToken(token)}
          ></GoogleLoginButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);