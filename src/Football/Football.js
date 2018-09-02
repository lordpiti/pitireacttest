import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';
import Players from './Players/Players';
import AppBar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { connect } from 'react-redux';

import './Football.css';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Football extends Component {

  state = {
    authenticationToken: localStorage.token_react
  }

  updateAuthenticationToken(token) {
    if (token) {
      localStorage.setItem('token_react', token);
    }
    else {
      localStorage.removeItem('token_react');
    }

    this.setState({
      authenticationToken: token
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <AppBar
          authenticationToken={this.state.authenticationToken}
          onUpdateAuthenticationToken={(token) => this.updateAuthenticationToken(token)}
        />
        <div className="Football overview-container">
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.props.loading}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="title" id="modal-title">
                  Loading ...
                </Typography>
              </div>
            </Modal>
          </div>
          {/* <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/" render={() => <h1>Home 2</h1>} /> 
          <Route path="/" exact component={Teams} />*/}
          <Route path="/teams" component={Teams} />
          <Route path="/competitions" component={Competitions} />
          {/* <Route path="/players" component={Players} /> */}
          <PrivateRoute path="/players" component={Players} />
        </div>
      </div>
    );
  }
}

Football.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FootballWithModalWrapped = withStyles(styles)(Football);


const mapStateToProps = state => {
  return {
    loading: state.global.loading
  }
};


//Tricky bit ... since routes are used inside this component, need to add some stuff in order to use redux
//https://stackoverflow.com/questions/50199555/redux-connect-blocks-navigation-with-react-router-redux
export default connect(mapStateToProps, () => ({}), null, { pure: false })(withStyles(styles)(FootballWithModalWrapped));
