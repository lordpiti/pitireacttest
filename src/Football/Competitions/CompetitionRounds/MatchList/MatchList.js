import React from 'react';
import { Link } from 'react-router-dom';

const MatchList = ( props ) => {

	return (
		<div>
			{props.matchList.map(match =>
				<div key={match.matchId} className="row">
					<div className="col-sm-5">{match.localTeam.name}</div>
					<div className="col-sm-2">
						<Link to={{
              pathname: props.currentUrl+'/competition-rounds/match/'+match.matchId
            }}>{match.goalsLocal} - {match.goalsVisitor}</Link>
					</div>
					<div className="col-sm-5">{match.visitorTeam.name}</div>
				</div>)
			}
		</div>
	)
};

export default MatchList;