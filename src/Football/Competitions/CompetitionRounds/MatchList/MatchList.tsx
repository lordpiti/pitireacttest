import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@material-ui/core';

interface MatchListProps {
  matchList: any[];
}

const MatchList = (props: MatchListProps) => {
  const { url } = useRouteMatch();
  return (
    <Card>
      <CardHeader title='Games' />
      <CardContent>
        {props.matchList.map((match) => (
          <div key={match.matchId} className='row'>
            <div className='col-sm-5'>
              <Link
                to={{
                  pathname: `/teams/team-details/${match.localTeam.id}`,
                }}
              >
                {match.localTeam.name}
              </Link>
            </div>
            <div className='col-sm-2'>
              <Link
                to={{
                  pathname:
                    url +
                    '/match/' +
                    match.matchId,
                }}
              >
                {match.goalsLocal} - {match.goalsVisitor}
              </Link>
            </div>
            <div className='col-sm-5'>
              <Link
                to={{
                  pathname: `/teams/team-details/${match.visitorTeam.id}`,
                }}
              >
                {match.visitorTeam.name}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MatchList;
