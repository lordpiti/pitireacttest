import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleGamePlayed from './SingleGamePlayed/SingleGamePlayed';
import { RouteComponentProps } from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';

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
        <Accordion key={group.competition.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {group.competition.name} {group.competition.season}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'inline-block', width: '100%' }}>
              {group.data.map((match: any, index: number) => (
                <SingleGamePlayed key={index} gamePlayed={match} {...props} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Disabled Expansion Panel
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

export default withStyles(styles)(SimpleExpansionPanel);
