import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import CompetitionDraw from '../CompetitionDraw/CompetitionDraw';
import SideMenu from '../../components/SideMenu/SideMenu';
import apiInstance from '../../utilities/axios-test';
import Match from '../Match/Match';

class CompetitionDetails extends Component {

  constructor(props) {
    super(props);
    apiInstance.get('competition/' + props.match.params.id).then(response => {
      this.setState({
        competitionData: response.data
      });
    });

  }

  state = {
    competitionData: null
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
      }
    ];

    let competitionTypeContent = null;

    let pageContent = null;

    if (this.state.competitionData) {
      if (this.state.competitionData.type !== 'Playoff') {
        competitionTypeContent = <CompetitionRounds competitionData={this.state.competitionData} {...this.props} ></CompetitionRounds>;
      }
      else {
        competitionTypeContent = <CompetitionDraw match={this.props.match} competitionData={this.state.competitionData} ></CompetitionDraw>;
      }

      pageContent =
        <div className="CompetitionDetails">
          <div className="row">
            <div className="col-sm-3">
              <SideMenu itemList={menuItemList} />
            </div>
            <div className="col-sm-9">
              <Route path={this.props.match.url + '/'} exact
                render={() => (<Redirect to={this.props.match.url + '/overview'} />)}
              />
              <Route path={this.props.match.url + '/match/:id'}
                component={Match}
              />
              <Route path={this.props.match.url + '/overview'}
                render={(props) => {
                  return (
                    <CompetitionInfo competitionData={this.state.competitionData}></CompetitionInfo>)
                }
                } />
              <Route path={this.props.match.url + '/competition-rounds'}
                component={props => {
                  return (
                    competitionTypeContent)
                }
                }
              />
            </div>
          </div>
        </div>
    }

    return (
      // <div className="CompetitionDetails">
      //     <div className="row">
      //         <div className="col-sm-3">
      //             <SideMenu itemList={menuItemList} />
      //         </div>
      //         <div className="col-sm-9">
      //             <Route path={this.props.match.url+'/'} exact 
      //                 render={(props)=>{
      //                     return (
      //                     <CompetitionInfo id={competitionId}></CompetitionInfo>)}
      //             } />
      //             <Route path={this.props.match.url+'/overview'}
      //                 render={(props)=>{
      //                     return (
      //                     <CompetitionInfo id={competitionId}></CompetitionInfo>)}
      //             } />
      //         <Route path={this.props.match.url+'/competition-rounds'} 
      //             render={(props)=>{
      //                 return (
      //                 <CompetitionRounds competitionData={competitionId} ></CompetitionRounds>)}
      //             }
      //         />
      //         </div>
      //     </div>
      // </div>
      <div>
        {pageContent}
      </div>
    );
  }
}

export default CompetitionDetails;