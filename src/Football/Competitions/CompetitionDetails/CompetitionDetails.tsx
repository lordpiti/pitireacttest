import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import CompetitionDraw from '../CompetitionDraw/CompetitionDraw';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../Match/Match';
import CompetitionStatistics from '../CompetitionStatistics/CompetitionStatistics';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitionsActions';
import { FootballState, FootballDispatch } from '../../..';

interface MatchParams {
  id: string;
}

interface CompetitionDetailsProps extends RouteComponentProps<MatchParams> {
  loadCompetition: Function;
  currentCompetition: any;
}

class CompetitionDetails extends Component<CompetitionDetailsProps> {
  componentDidMount() {
    this.props.loadCompetition(this.props.match.params.id);
  }

  render() {
    const competitionId = parseInt(this.props.match.params.id);

    let menuItemList = [
      {
        name: 'Summary',
        url: this.props.match.url + '/overview',
      },
    ];

    let competitionTypeContent = null as any;

    let pageContent = null;

    if (this.props.currentCompetition) {
      if (this.props.currentCompetition.type !== 'Playoff') {
        menuItemList = menuItemList.concat([
          {
            name: 'Rounds',
            url: this.props.match.url + '/competition-rounds',
          },
          {
            name: 'Statistics',
            url: this.props.match.url + '/competition-statistics',
          },
        ]);
        competitionTypeContent = (
          <CompetitionRounds
            competitionData={this.props.currentCompetition}
            {...this.props}
          ></CompetitionRounds>
        );
      } else {
        menuItemList.push({
          name: 'Draw',
          url: this.props.match.url + '/competition-rounds',
        });
        competitionTypeContent = (
          <CompetitionDraw
            match={this.props.match}
            competitionData={this.props.currentCompetition}
          ></CompetitionDraw>
        );
      }
      // By putting "component=xxx" in the Route to render a component, we force that everytime 'xxx' changes,
      // the child component runs the whole life cycle, including the constructor
      // Normally this is not needed so better to use "render=xxx" which will only run the render method in the child component
      pageContent = (
        <div className='CompetitionDetails'>
          <div className='row'>
            <div className='col-sm-3'>
              <SideMenu itemList={menuItemList}>
                <div className='margin-bottom-medium'>
                  <img
                    src={this.props.currentCompetition.logo.url}
                    className='roundedImage'
                    height='50'
                    width='50'
                  />
                  <span>{`${this.props.currentCompetition.name}`}</span>
                </div>
              </SideMenu>
            </div>
            <div className='col-sm-9'>
              <Route
                path={this.props.match.url + '/'}
                exact
                render={() => (
                  <Redirect to={this.props.match.url + '/overview'} />
                )}
              />
              <Route
                path={this.props.match.url + '/competition-rounds/match/:id'}
                component={Match}
              />
              <Route
                path={this.props.match.url + '/overview'}
                component={() => {
                  return (
                    <CompetitionInfo
                      competitionData={this.props.currentCompetition}
                    ></CompetitionInfo>
                  );
                }}
              />
              <Route
                path={this.props.match.url + '/competition-rounds'}
                component={() => competitionTypeContent}
                exact
              />
              <Route
                path={this.props.match.url + '/competition-statistics'}
                render={() => (
                  <CompetitionStatistics
                    competitionId={competitionId}
                  ></CompetitionStatistics>
                )}
                exact
              />
            </div>
          </div>
        </div>
      );
    }

    return <div>{pageContent}</div>;
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    currentCompetition: state.competitions.currentCompetition,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadCompetition: (competitionId: number) =>
      dispatch(actionCreators.loadCompetition(competitionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionDetails);
