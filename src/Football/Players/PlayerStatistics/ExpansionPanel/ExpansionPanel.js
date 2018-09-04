import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleGamePlayed from './SingleGamePlayed/SingleGamePlayed';

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

  return (
    <div className={classes.root}>
      {props.matchListGroupedByCompetition.map(group => 
        <ExpansionPanel key={group.competition.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{group.competition.name} {group.competition.season}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <div style={{display: 'inline-block', width: '100%'}}>
            {group.data.map((match, index) => (
              <SingleGamePlayed key={index} gamePlayed={match} {...props} />
            ))}
            </div>
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
