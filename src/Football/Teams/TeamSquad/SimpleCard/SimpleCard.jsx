import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Formatters from '../../../utilities/formatters';
import './SimpleCard.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    paddingTop: '56.25%', // 16:9
    backgroundPosition: 'top'
  },
};

function SimpleMediaCard(props) {

  const { classes } = props;
  return (
    <div className="margin-bottom-medium simpleCard">
      <Link to={`/players/player-details/${props.cardData.playerId}`}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {props.cardData.dorsal}
              </Avatar>
            }
            title={`${props.cardData.name} ${props.cardData.surname}`}
            subheader={props.cardData.position}
          />
          <CardMedia
            className={classes.media}
            image={props.cardData.picture.url}
            title={props.cardData.name}
          />
          <CardContent>
            {/* <Typography gutterBottom component="p">
              Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum
            </Typography> */}
            <Typography component="p">
              {Formatters.formatDate(props.cardData.birthDate)}
              <br/>
              {props.cardData.height} m
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small" color="primary">
              Share
          </Button>
            <Button size="small" color="primary">
              Learn More
          </Button>
          </CardActions> */}
        </Card>
      </Link>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
