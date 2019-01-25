import React, { Component } from 'react';
import LocationSearchInput from '../../components/PlacesAutocomplete/PlacesAutocomplete';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/players';
import TextField from '@material-ui/core/TextField';
import PlayerInfoModal from './PlayerInfoModal/PlayerInfoModal';
import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import Formatters from '../../utilities/formatters';

class PlayerInfo extends Component {

  constructor(props) {
    super(props);

		let newState = { 
			playerData: props.playerData
		};

		this.state = newState;
  }

  render() {

    return (
      <div>
        <h1>Player Basic Info</h1>
        <Paper>
          <div className="row" style={{ padding: '20px'}}>
            <div className="col-sm-7">
              <div>First Name: {this.state.playerData.name}</div>
              <div>Last Name: {this.state.playerData.surname}</div>
              <div>Position: {this.state.playerData.position}</div>
              <div>Height: {this.state.playerData.height} m</div>
              <div>Place of Birth: {this.state.playerData.birthPlace}</div>
              <div>Date of Birth: {Formatters.formatDate(this.state.playerData.birthDate)}</div>
              <br/>
              <RoleVisibleComponent
                component={PlayerInfoModal}
                roles={['Admin']}
                playerData={this.state.playerData}
                savePlayer={ (a, b) => this.props.savePlayer(a, b) } />
            </div>
            <div className="col-sm-5 text-right">
              <img src={this.state.playerData.picture.url} height="300px" width="300px"/>  
            </div>
          </div>
        </Paper>
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