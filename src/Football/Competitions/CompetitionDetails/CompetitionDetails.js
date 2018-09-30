import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import CompetitionDraw from '../CompetitionDraw/CompetitionDraw';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../Match/Match';
import CompetitionStatistics from '../CompetitionStatistics/CompetitionStatistics';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitions';

class CompetitionDetails extends Component {

  componentDidMount() {
    this.props.loadCompetition(this.props.match.params.id);
  }

  render() {
    const competitionId = this.props.match.params.id;

    const menuItemList = [
      {
        name: 'Summary',
        url: this.props.match.url + '/overview'
      },
      {
        name: 'Rounds',
        url: this.props.match.url + '/competition-rounds'
      },
      {
        name: 'Statistics',
        url: this.props.match.url + '/competition-statistics'
      }
    ];

    let competitionTypeContent = null;

    let pageContent = null;

    if (this.props.currentCompetition) {
      if (this.props.currentCompetition.type !== 'Playoff') {
        competitionTypeContent = <CompetitionRounds competitionData={this.props.currentCompetition} {...this.props} ></CompetitionRounds>;
      }
      else {
        competitionTypeContent = <CompetitionDraw match={this.props.match} competitionData={this.props.currentCompetition} ></CompetitionDraw>;
      }

      pageContent =
        <div className="CompetitionDetails">
          <div className="row">
            <div className="col-sm-3">
              <SideMenu itemList={menuItemList} >
                <div className="margin-bottom-medium">
                  <img src={this.props.currentCompetition.logo.url} className="roundedImage" height="50" width="50" />
                  <span>{`${this.props.currentCompetition.name}`}</span>
                </div>
              </SideMenu>
            </div>
            <div className="col-sm-9">
              <Route path={this.props.match.url + '/'} exact
                render={() => (<Redirect to={this.props.match.url + '/overview'} />)}
              />
              <Route path={this.props.match.url + '/competition-rounds/match/:id'}
                component={Match}
              />
              <Route path={this.props.match.url + '/overview'}
                render={(props) => {
                  return (
                    <CompetitionInfo competitionData={this.props.currentCompetition}></CompetitionInfo>)
                }
                } />
              <Route path={this.props.match.url + '/competition-rounds'}
                component={props => {
                  return (
                    competitionTypeContent)
                }
                } exact
              />
              <Route path={this.props.match.url + '/competition-statistics'}
                render={props => {
                  return (
                    <CompetitionStatistics competitionId={competitionId}></CompetitionStatistics>)
                }
                } exact
              />
            </div>
          </div>
        </div>
    }

    return (
      <div>
        {pageContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCompetition: state.competitions.currentCompetition
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadCompetition: (competitionId) => dispatch(actionCreators.loadCompetition(competitionId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionDetails);