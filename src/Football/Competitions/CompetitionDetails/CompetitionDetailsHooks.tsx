import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import CompetitionDraw from '../CompetitionDraw/CompetitionDraw';
import SideMenu, { MenuItemSideMenu } from '../../components/SideMenu/SideMenu';
import Match from '../Match/Match';
import CompetitionStatistics from '../CompetitionStatistics/CompetitionStatistics';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { useAppDispatch } from '../../store/store';
import { getCurrentCompetition } from '../store/competitions.selectors';
import { loadCompetition } from '../store/competitions.actions';

interface MatchParams {
  id: string;
}

const CompetitionDetails = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<MatchParams>();
  const competitionId = parseInt(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCompetition(competitionId));
  }, []);

  const currentCompetition = useSelector(getCurrentCompetition);

  let menuItemList: MenuItemSideMenu[] = [
    {
      name: 'Summary',
      url: url + '/overview',
    },
  ];

  let competitionTypeContent = <></>;

  if (currentCompetition) {
    if (currentCompetition.type !== 'Playoff') {
      menuItemList = menuItemList.concat([
        {
          name: 'Rounds',
          url: url + '/competition-rounds',
        },
        {
          name: 'Statistics',
          url: url + '/competition-statistics',
        },
      ]);

      competitionTypeContent = (
        <CompetitionRounds
          competitionData={currentCompetition}
        ></CompetitionRounds>
      );
    } else {
      menuItemList.push({
        name: 'Draw',
        url: url + '/competition-rounds',
      });
      competitionTypeContent = (
        <CompetitionDraw
          competitionData={currentCompetition}
        ></CompetitionDraw>
      );
    }
    // By putting "component=xxx" in the Route to render a component, we force that everytime 'xxx' changes,
    // the child component runs the whole life cycle, including the constructor
    // Normally this is not needed so better to use "render=xxx" which will only run the render method in the child component
    return (
      <div className='CompetitionDetails'>
        <div className='row'>
          <div className='col-sm-3'>
            <SideMenu itemList={menuItemList}>
              <div className='margin-bottom-medium'>
                <img
                  src={currentCompetition.logo.url}
                  className='roundedImage'
                  height='50'
                  width='50'
                />
                <span>{currentCompetition.name}</span>
              </div>
            </SideMenu>
          </div>
          <div className='col-sm-9'>
            <Route
              path={url + '/'}
              exact
              render={() => <Redirect to={url + '/overview'} />}
            />
            <Route
              path={url + '/competition-rounds/match/:id'}
              component={Match}
            />
            <Route
              path={url + '/overview'}
              render={() => {
                return (
                  <CompetitionInfo />
                );
              }}
            />
            <Route
              path={url + '/competition-rounds'}
              render={() => competitionTypeContent}
              exact
            />
            <Route
              path={url + '/competition-statistics'}
              render={() => (
                <CompetitionStatistics
                  competitionId={currentCompetition.id}
                ></CompetitionStatistics>
              )}
              exact
            />
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default CompetitionDetails;
