import React, { Component } from 'react';
import LocationSearchInput from '../../components/PlacesAutocomplete/PlacesAutocomplete';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/players';
import TextField from '@material-ui/core/TextField';
import PlayerInfoModal from './PlayerInfoModal/PlayerInfoModal';

class PlayerInfo extends Component {

  constructor(props) {
    super(props);

		let newState = { 
			playerData: props.playerData
		};

		this.state = newState;
  }

  render() {

    let content = null;

    if (localStorage.role_react === 'Admin') {
      content = <PlayerInfoModal playerData={this.state.playerData} savePlayer={ (a, b) => this.props.savePlayer(a, b) } />
    }

    return (
      <div>
        <h1>Player Basic Info</h1>
        { content }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentPlayer: state.players.currentPlayer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    savePlayer: (image, playerData) => dispatch(actionCreators.savePlayer(image, playerData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);