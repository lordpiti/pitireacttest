import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import GoogleLoginButton from './GoogleAuthenticator/GoogleAuthenticator';
import FacebookLoginButton from './FacebookAuthenticator/FacebookAuthenticator';
import './AppBar.scss';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

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

interface OwnProps {
  onUpdateAuthenticationToken: Function;
  authenticationToken: string | null;
}

type AppBarPropsWithStyles = OwnProps & WithStyles;

const ButtonAppBar = (props: AppBarPropsWithStyles) => {
  const { classes } = props;

  const facebookAuthenticationType =
    localStorage.getItem('authentication_type') == '1';

  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <span
            style={{
              fontSize: 'x-large',
              fontWeight: 'bold',
              marginRight: '20px',
            }}
          >
            FootballWeb React
          </span>
          <Typography
            variant='subtitle1'
            color='inherit'
            className={classes.flex}
          >
            {/* <NavLink style={{color: 'white'}} to="/" exact>
              <Button color="inherit">Home</Button>
            </NavLink> */}
            <div className='appBarSections'>
              <NavLink
                style={{ color: 'white' }}
                to={{
                  pathname: '/teams',
                }}
              >
                <Button color='inherit'>{t('teams.title')}</Button>
              </NavLink>

              <NavLink
                style={{ color: 'white' }}
                to={{
                  pathname: '/competitions',
                }}
              >
                <Button color='inherit'>{t('competitions.title')}</Button>
              </NavLink>

              <NavLink
                style={{ color: 'white' }}
                to={{
                  pathname: '/players',
                }}
              >
                <Button color='inherit'>{t('players.title')}</Button>
              </NavLink>
              <NavLink
                style={{ color: 'white' }}
                to={{
                  pathname: '/graphicDemo',
                }}
              >
                <Button color='inherit'>D3 Demo</Button>
              </NavLink>
            </div>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <div className='row'>
            <LanguageSelector />
            <FacebookLoginButton
              authenticationToken={props.authenticationToken}
              showLogoutButton={facebookAuthenticationType}
              authenticationTokenUpdate={(token: string) =>
                props.onUpdateAuthenticationToken(token)
              }
            />

            <GoogleLoginButton
              authenticationToken={props.authenticationToken}
              showLogoutButton={!facebookAuthenticationType}
              authenticationTokenUpdate={(token: string) =>
                props.onUpdateAuthenticationToken(token)
              }
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(ButtonAppBar);
