import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  console.log(props);
  debugger;

  return (
    <div className={classes.root}>
      {props.matchListGroupedByCompetition.map(group => 
        <ExpansionPanel key={group.competition.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{group.competition.name} {group.competition.season}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Typography>
            {group.data.map((match, index) => (
              <div  key={index}>
                <Link to={`${props.match.url}/player-statistics/match/${match.id}`}>{`${match.localTeamName} ${match.localGoals} - ${match.visitorGoals} ${match.visitorTeamName}`}</Link>
                </div>
            ))}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
