import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Formatters from '../../../utilities/formatters';
import './ReaderCard.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function ReaderCard(props) {

  const { classes } = props;

  return (
    <div className="margin-bottom-medium readerCard">
      <a href={props.cardData.link}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {props.cardData.index}
              </Avatar>
            }
            title={props.cardData.title}
            subheader={props.cardData.categories? props.cardData.categories[0]: null}
          />
          <CardMedia
            className={classes.media}
            image={props.cardData["media:content"].$.url}
            title={props.cardData.title}
          />
          <CardContent>
            <Typography gutterBottom component="p">
              {props.cardData.creator}
            </Typography>
            <Typography component="p">
              {props.cardData.date}

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
      </a>
    </div>
  );
}

ReaderCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReaderCard);
