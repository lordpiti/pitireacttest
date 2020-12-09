import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SingleGamePlayed from './SingleGamePlayed/SingleGamePlayed';
import { RouteComponentProps } from 'react-router';
import DetailsPanel from './DetailsPanel/DetailsPanel';

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
		<ExpansionPanel key={props.competition.id} onChange={handleChange}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>
					{props.competition.name} {props.competition.season}
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{expanded && (<DetailsPanel competitionId={props.competition.id} {...props} />)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

export default withStyles(styles)(SimpleExpansionPanelOnDemand);
