import { useSelector } from 'react-redux';
import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import editCompetitionComponent from './EditCompetitionHooks/EditCompetitionHooks';
import { getCurrentCompetition } from '../store/competitions.selectors';
import { useAppDispatch } from '../../store/store';
import { saveCompetition } from '../store/competitions.actions';

interface CompetitionInfoProps {
  competitionData: any;
}

const CompetitionInfo = (props: CompetitionInfoProps) => {

  const competitionData = useSelector(getCurrentCompetition);
  const dispatch = useAppDispatch();

  if (!competitionData) {
    return <div></div>;
  } else {
    return (
      <div>
        <h1>Competition Basic Info</h1>
        <Paper>
          <div className='row' style={{ padding: '20px' }}>
            <div className='col-sm-7'>
              <div>Name: {competitionData.name}</div>
              <div>Season: {competitionData.season}</div>
              <br />
              <RoleVisibleComponent
                component={editCompetitionComponent}
                roles={['Admin']}
                competitionData={competitionData}
                saveCompetition={(a: any, b: any) =>
                  dispatch(saveCompetition({ image: a, competitionData: b }))
                }
              />
            </div>
            <div className='col-sm-5 text-right'>
              <img
                src={competitionData.logo.url}
                height='300px'
                width='300px'
                alt=''
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
};

export default CompetitionInfo;
