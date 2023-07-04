import { connect, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/teamsActions';
// import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import RoleVisibleWrapper from '../../components/RoleVisibleComponent/RoleVisibleWrapper';
import { Paper } from '@material-ui/core';
import EditTeamComponent from './EditTeam/EditTeam';
import { useAppDispatch } from '../../store/store';
// import { getCurrentTeam } from '../store/teams.selectors';
// import { FootballSagasDispatch } from '../../store/middleware/sagasMiddleware';

export interface TeamInfoProps {
  teamData: any;
}

const TeamInfo = (props: TeamInfoProps) => {

  const dispatch = useAppDispatch();

  // const currentTeam = useSelector(getCurrentTeam);

  const saveTeam = (image: any, teamData: any) =>
    dispatch(actionCreators.saveTeamSagas(image, teamData));

  return (
    <div>
      <h1>Team Basic Info</h1>
      <Paper>
        <div className='row' style={{ padding: '20px' }}>
          <div className='col-sm-7'>
            <div>Name: {props.teamData.name}</div>
            <br />
            {/* <RoleVisibleComponent
              component={editTeamComponent}
              roles={['Admin']}
              teamData={props.teamData}
              saveTeam={ (a, b) => props.saveTeam(a, b) } /> */}
            <RoleVisibleWrapper roles={['Admin']}>
              <EditTeamComponent
                teamData={props.teamData}
                saveTeam={(image: any, teamData: any) =>
                  saveTeam(image, teamData)
                }
              />
            </RoleVisibleWrapper>
          </div>
          <div className='col-sm-5 text-right'>
            <img
              src={props.teamData.pictureLogo.url}
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

export default TeamInfo;
