import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import red from '@material-ui/core/colors/red';
import Formatters from '../../../utilities/formatters';
import CompetitionSimulationMatchEvent from './CompetitionSimulationMatchEvent/CompetitionSimulationMatchEvent';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

function CompetitionSimulationMatch(props) {

  const { classes } = props;

  const titleForGame = props.match.localTeam.name + ' ' + props.match.goalsLocal
    + ' - ' + props.match.goalsVisitor + ' ' + props.match.visitorTeam.name;

  return (
    <div className="margin-bottom-medium">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {props.match.id}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={titleForGame}
          subheader={Formatters.formatDate(props.match.date)}
        />
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.match.id}
        /> */}
        <CardContent>
          {/* <Typography gutterBottom variant="headline" component="h2">
            {props.match.id} {props.match.id}
          </Typography>
          <Typography component="p">
            buuu
          </Typography> */}
          {props.match.matchEvents.map((event, index) =>
            <CompetitionSimulationMatchEvent key={index} event={event} />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

CompetitionSimulationMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompetitionSimulationMatch);
