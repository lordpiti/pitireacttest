import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitions';
import RoleVisibleComponent from '../../components/RoleVisibleComponent/RoleVisibleComponent';
import { Paper } from '@material-ui/core';
import editCompetitionComponent from './EditCompetitionHooks/EditCompetitionHooks';

const CompetitionInfo = (props) => {

  if (!props.competitionData) {
    return (<div></div>);
  } else {

    return (
      <div>
        <h1>Competition Basic Info</h1>
        <Paper>
          <div className="row" style={{ padding: '20px' }}>
            <div className="col-sm-7">
              <div>Name: {props.competitionData.name}</div>
              <div>Season: {props.competitionData.season}</div>
              <br />
              <RoleVisibleComponent
                component={editCompetitionComponent}
                roles={['Admin']}
                competitionData={props.competitionData}
                saveCompetition={(a, b) => props.saveCompetition(a, b)} />
            </div>
            <div className="col-sm-5 text-right">
              <img src={props.competitionData.logo.url} height="300px" width="300px" alt="" />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentCompetition: state.competitions.currentCompetition
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveCompetition: (image, competitionData) => dispatch(actionCreators.saveCompetition(image, competitionData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionInfo);