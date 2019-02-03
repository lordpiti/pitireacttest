import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/players';
import PlayerInfoModal from './PlayerInfoModal/PlayerInfoModal';
import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import Formatters from '../../utilities/formatters';

const PlayerInfo = (props) => {

  return (
    <div>
      <h1>Player Basic Info</h1>
      <Paper>
        <div className="row" style={{ padding: '20px'}}>
          <div className="col-sm-7">
            <div>First Name: {props.playerData.name}</div>
            <div>Last Name: {props.playerData.surname}</div>
            <div>Position: {props.playerData.position}</div>
            <div>Height: {props.playerData.height} m</div>
            <div>Place of Birth: {props.playerData.birthPlace}</div>
            <div>Date of Birth: {Formatters.formatDate(props.playerData.birthDate)}</div>
            <br/>
            <RoleVisibleComponent
              component={PlayerInfoModal}
              roles={['Admin']}
              playerData={props.playerData}
              savePlayer={ (a, b) => props.savePlayer(a, b) } />
          </div>
          <div className="col-sm-5 text-right">
            <img src={props.playerData.picture.url} height="300px" width="300px"/>  
          </div>
        </div>
      </Paper>
    </div>
  );
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