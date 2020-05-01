import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
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

const readerCard = ({ classes, cardData}) => {

  let imageUrl = null;
  if (cardData["media:thumbnail"]) {
    imageUrl = cardData["media:thumbnail"].$.url;
  }
  else if (cardData["media:content"]) {
    imageUrl = cardData["media:content"].$.url;
  }

  return (
    <div className="margin-bottom-medium readerCard">
      <a href={cardData.link} target="_blank">
        <Card className={classes.card}>
          <CardHeader
            title={cardData.title}
            subheader={cardData.categories? cardData.categories[0]: null}
          />
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={cardData.title}
          />
          <CardContent>
            <Typography gutterBottom component="p">
              {cardData.creator}
            </Typography>
            <Typography component="p">
              {Formatters.formatDate(cardData.isoDate)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}

readerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardData: PropTypes.shape({
    index: PropTypes.number.isRequired,
    categories: PropTypes.array,
    title: PropTypes.string.isRequired,
    creator: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(readerCard);
