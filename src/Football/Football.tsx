import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';
import Players from './Players/Players';
import AppBar from './components/AppBar/AppBar';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import './Football.scss';
import CustomSnackbar from './components/CustomSnackbar/CustomSnackbar';
import Home from './Home/Home';
import { FootballState as FootbalStateRedux } from './store';
import { GraphicDemo } from './components/GraphicDemo/GraphicDemo';
import { privacyPolicy } from './privacy-policy/privacy-policy';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

//https://material-ui.com/es/guides/typescript/
const styles = (theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: theme.spacing(50),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
    },
  });

interface Token {
  token: string;
  role: string;
  userName: string;
  authenticationType: string;
  avatar: string;
}

interface FootballState {
  authenticationToken: string | null;
}

interface FootballProps extends WithStyles<typeof styles> {
  loading: boolean;
}

class Football extends Component<FootballProps, FootballState> {
  constructor(props: FootballProps) {
    super(props);
    this.state = {
      authenticationToken: localStorage.token_react,
    };
  }

  updateAuthenticationToken(token: Token) {
    if (token) {
      localStorage.setItem('token_react', token.token);
      localStorage.setItem('role_react', token.role);
      localStorage.setItem('userName_react', token.userName);
      localStorage.setItem('authentication_type', token.authenticationType);
      localStorage.setItem('loginImage_react', token.avatar);
    } else {
      localStorage.removeItem('token_react');
      localStorage.removeItem('role_react');
      localStorage.removeItem('userName_react');
      localStorage.removeItem('authentication_type');
      localStorage.removeItem('loginImage_react');
    }

    this.setState({
      authenticationToken: token ? token.token : null,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar
          authenticationToken={this.state.authenticationToken}
          onUpdateAuthenticationToken={(token: Token) =>
            this.updateAuthenticationToken(token)
          }
        />

        <div className='Football overview-container'>
          <div>
            <Modal
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              open={this.props.loading}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant='subtitle1' id='modal-title'>
                  Loading ...
                </Typography>
              </div>
            </Modal>
          </div>
          <CustomSnackbar></CustomSnackbar>
          <Route path='/' exact component={Home} />
          <Route path='/teams' component={Teams} />
          <Route path='/competitions' component={Competitions} />
          <Route path='/graphicDemo' component={GraphicDemo} />
          {/* <PrivateRoute path="/players" component={Players} /> */}
          <Route path='/players' component={Players} />
          <Route path='/privacy-policy' component={privacyPolicy} />
        </div>
        <Link
          to={{
            pathname: `/privacy-policy`,
          }}
        >
          Privacy Policy
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ global: { loading } }: FootbalStateRedux) => ({
  loading,
});

export default connect(mapStateToProps)(withStyles(styles)(Football));

// ALTERNATIVE: use this and import compose from 'redux'
// export default compose(
//   connect(mapStateToProps),
//   withStyles(styles)
// )(Football) as React.ElementType;
