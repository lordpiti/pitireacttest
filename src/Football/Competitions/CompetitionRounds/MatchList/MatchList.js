import React from 'react';

const MatchList = ( props ) => {

    return (
        <div>
            {props.matchList.map(match => 
                <div key={match.matchId} className="row">
                    <div className="col-sm-5">{match.localTeam.name}</div>
                    <div className="col-sm-2">{match.goalsLocal} - {match.goalsVisitor}</div>
                    <div className="col-sm-5">{match.visitorTeam.name}</div>
                </div>)
            }
        </div>
    )
};

export default MatchList;