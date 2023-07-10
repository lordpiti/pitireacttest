import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import Formatters from '../../utilities/formatters';
import editPlayerComponent from './EditPlayer/EditPlayer';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/store';
import { savePlayer } from '../store/players.actions';

interface PlayerInfoProps {
  playerData: PlayerData;
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

  const dispatch = useAppDispatch();
  // const currentPlayer = useSelector(getCurrentPlayer);

  const savePlayerHandler = (image: any, playerData: any) => {
    dispatch(savePlayer({ image, playerData }));
  }

  return (
    <div>
      <h1>{t('players.info')}</h1>
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
              savePlayer={savePlayerHandler}
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

export default PlayerInfo;
