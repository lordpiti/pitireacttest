import React from 'react';

const MatchPlayerSingle = ( props ) => {

  let substitutionIn, substitutionOut = null;

  if (props.player.substitutionIn) {
    substitutionIn = <span>
      <span className="glyphicon glyphicon-arrow-left"></span>
      <span>{props.player.substitutionIn.minute}</span>
    </span>;
  }

  if (props.player.substitutionOut) {
    substitutionOut = <span>
      <span className="glyphicon glyphicon-arrow-right"></span>
      <span>{props.player.substitutionOut.minute}</span>
    </span>;
  }

  return (
    <div className="row match-player-single">
    <div className="col-sm-1">{props.player.dorsal}</div>
    <div className="col-sm-5">
      {props.player.name} {props.player.surname}
    </div>
    <div className="col-sm-1">
        {substitutionIn}
        {substitutionOut}
    </div>
    <div className="col-sm-2">
      {props.player.bookings.map((booking, index) => {
        const cardImageUrl = booking.type==='Amarilla'?'/assets/img/yellow_card-512.png':'/assets/img/red_card-512.png';

        return <div key={index}>
          <img src={cardImageUrl} width="20" height="20" alt=""/>
          <label className="small">{booking.minute}</label>
        </div>
      }
      )}
    </div>
    <div className="col-sm-2">
      {props.player.goals.map((goal, index) =>
        <span key={index}>
          <img src="/assets/img/ball.png" width="20" height="20" alt=""/>
          <label className="small">{goal.minute}</label>
        </span>)
      }
    </div>
  </div>
  )
};

export default MatchPlayerSingle;