import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/playersActions';
import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import Formatters from '../../utilities/formatters';
import editPlayerComponent from './EditPlayer/EditPlayer';
import { FootballState, FootballDispatch } from '../../..';
import { useTranslation } from 'react-i18next';

interface PlayerInfoProps {
  playerData: PlayerData;
  savePlayer: Function;
}

interface PlayerData {
  name: string;
  surname: string;
  position: string;
  height: number;
  birthPlace: string;
  birthDate: string;
  picture: any;
}

const PlayerInfo = (props: PlayerInfoProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('title')}</h1>
      <Paper>
        <div className='row' style={{ padding: '20px' }}>
          <div className='col-sm-5'>
            <div>First Name: {props.playerData.name}</div>
            <div>Last Name: {props.playerData.surname}</div>
            <div>Position: {props.playerData.position}</div>
            <div>Height: {props.playerData.height} m</div>
            <div>Place of Birth: {props.playerData.birthPlace}</div>
            <div>
              Date of Birth: {Formatters.formatDate(props.playerData.birthDate)}
            </div>
            <br />
            <RoleVisibleComponent
              component={editPlayerComponent}
              roles={['Admin']}
              playerData={props.playerData}
              savePlayer={props.savePlayer}
            />
          </div>
          <div className='col-sm-2'>
            <img
              src='/assets/img/pitch-positions.png'
              height='300px'
              width='225'
              alt=''
            />
          </div>
          <div className='col-sm-5 text-right'>
            <img
              src={props.playerData.picture.url}
              height='300px'
              width='300px'
              alt=''
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: FootballState) => {
  return {
    currentPlayer: state.players.currentPlayer,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    savePlayer: (image: any, playerData: any) =>
      dispatch(actionCreators.savePlayerAction(image, playerData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
