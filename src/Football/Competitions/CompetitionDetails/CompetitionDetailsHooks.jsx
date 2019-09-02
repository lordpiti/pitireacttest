import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import CompetitionDraw from '../CompetitionDraw/CompetitionDraw';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../Match/Match';
import CompetitionStatistics from '../CompetitionStatistics/CompetitionStatistics';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitions';

const CompetitionDetails = (props) => {

    const competitionId = props.match.params.id;
    useEffect(() => {
        props.loadCompetition(competitionId);
    },  []);
    

    let menuItemList = [
        {
            name: 'Summary',
            url: props.match.url + '/overview'
        }
    ];

    let competitionTypeContent = null;

    let pageContent = null;

    if (props.currentCompetition) {
        if (props.currentCompetition.type !== 'Playoff') {
            menuItemList = menuItemList.concat([{
                name: 'Rounds',
                url: props.match.url + '/competition-rounds'
            },
            {
                name: 'Statistics',
                url: props.match.url + '/competition-statistics'
            }]);
            competitionTypeContent = <CompetitionRounds competitionData={props.currentCompetition} {...props} ></CompetitionRounds>;
        }
        else {
            menuItemList.push({
                name: 'Draw',
                url: props.match.url + '/competition-rounds'
            });
            competitionTypeContent = <CompetitionDraw match={props.match} competitionData={props.currentCompetition} ></CompetitionDraw>;
        }
        // By putting "component=xxx" in the Route to render a component, we force that everytime 'xxx' changes,
        // the child component runs the whole life cycle, including the constructor
        // Normally this is not needed so better to use "render=xxx" which will only run the render method in the child component  
        pageContent =
            <div className="CompetitionDetails">
                <div className="row">
                    <div className="col-sm-3">
                        <SideMenu itemList={menuItemList} >
                            <div className="margin-bottom-medium">
                                <img src={props.currentCompetition.logo.url} className="roundedImage" height="50" width="50" />
                                <span>{`${props.currentCompetition.name}`}</span>
                            </div>
                        </SideMenu>
                    </div>
                    <div className="col-sm-9">
                        <Route path={props.match.url + '/'} exact
                            render={() => (<Redirect to={props.match.url + '/overview'} />)}
                        />
                        <Route path={props.match.url + '/competition-rounds/match/:id'}
                            component={Match}
                        />
                        <Route path={props.match.url + '/overview'}
                            render={() => {
                                return (
                                    <CompetitionInfo competitionData={props.currentCompetition}></CompetitionInfo>
                                    )
                            }
                            } />
                        <Route path={props.match.url + '/competition-rounds'}
                            component={() => competitionTypeContent} exact />
                        <Route path={props.match.url + '/competition-statistics'}
                            render={() => <CompetitionStatistics competitionId={competitionId}></CompetitionStatistics>} exact />
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