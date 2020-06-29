import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleGamePlayed from './SingleGamePlayed/SingleGamePlayed';
import { RouteComponentProps } from 'react-router';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export interface ExpansionPanelProps extends RouteComponentProps {
  classes: any;
  matchListGroupedByCompetition: any;
}

const SimpleExpansionPanel = (props: ExpansionPanelProps) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {props.matchListGroupedByCompetition.map((group: any) => (
        <ExpansionPanel key={group.competition.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {group.competition.name} {group.competition.season}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ display: 'inline-block', width: '100%' }}>
              {group.data.map((match: any, index: number) => (
                <SingleGamePlayed key={index} gamePlayed={match} {...props} />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Disabled Expansion Panel
          </Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(SimpleExpansionPanel);
