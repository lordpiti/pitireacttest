import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
  state = {
    authenticationToken: localStorage.token_react,
  };

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
          {/* <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/" render={() => <h1>Home 2</h1>} /> 
          <Route path="/" exact component={Teams} />*/}
          <Route path='/' exact component={Home} />
          <Route path='/teams' component={Teams} />
          <Route path='/competitions' component={Competitions} />
          {/* <Route path="/players" component={Players} /> */}
          {/* <PrivateRoute path="/players" component={Players} /> */}
          <Route path='/players' component={Players} />
        </div>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const FootballWithModalWrapped = withStyles(styles)(Football);

const mapStateToProps = (state: any) => {
  return {
    loading: state.global.loading,
  };
};

//Tricky bit ... since routes are used inside this component, need to add some stuff in order to use redux
//https://stackoverflow.com/questions/50199555/redux-connect-blocks-navigation-with-react-router-redux
export default connect(mapStateToProps, () => ({}), null, { pure: false })(
  withStyles(styles)(FootballWithModalWrapped)
);
