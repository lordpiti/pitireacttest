import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RouteComponentProps } from 'react-router';
import DetailsPanel from './DetailsPanel/DetailsPanel';
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
  competition: any;
  playerId: any;
}

const SimpleExpansionPanelOnDemand = (props: ExpansionPanelProps) => {
  const { classes } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion key={props.competition.id} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          {props.competition.name} {props.competition.season}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <DetailsPanel competitionId={props.competition.id} {...props} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default withStyles(styles)(SimpleExpansionPanelOnDemand);
