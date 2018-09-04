import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Formatters from '../../../../utilities/formatters';
import './SingleGamePlayed.css';

const SingleGamePlayed = (props) => {

  return (
    <Link to={`${props.match.url}/player-statistics/match/${props.gamePlayed.id}`}>
    <div className="SingleGamePlayed row">
      <div className="col-sm-2">
        {`Round ${props.gamePlayed.round}`}
      </div>
      <div className="col-sm-2">
      {Formatters.formatDate(props.gamePlayed.date)}
      </div>
      <div className="col-sm-6 matchTitle">  
        {`${props.gamePlayed.localTeamName} ${props.gamePlayed.localGoals} - ${props.gamePlayed.visitorGoals} ${props.gamePlayed.visitorTeamName}`}    
      </div>
    </div></Link>)
}

export default SingleGamePlayed;