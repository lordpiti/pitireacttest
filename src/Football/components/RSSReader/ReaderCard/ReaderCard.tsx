import React from 'react';
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Formatters from '../../../utilities/formatters';
import './ReaderCard.scss';
import { EnhancedItem } from '../RSSReader';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  });

interface OwnProps {
  classes: any;
  cardData: EnhancedItem;
}

type ReaderCardProps = OwnProps & WithStyles;

const readerCard = (props: ReaderCardProps) => {
  const { classes, cardData } = props;

  let imageUrl = null;
  if (cardData['media:thumbnail']) {
    imageUrl = cardData['media:thumbnail'].$.url;
  } else if (cardData['media:content']) {
    imageUrl = cardData['media:content'].$.url;
  }

  return (
    <div className='readerCard'>
      <a href={cardData.link} target='_blank' rel='noreferrer'>
        <Card className={classes.card}>
          <CardHeader
            title={cardData.title}
            subheader={cardData.categories ? cardData.categories[0] : null}
          />
          <CardMedia
            className={classes.media}
            image={imageUrl || '/assets/img/no-image.png'}
            title={cardData.title}
          />
          <CardContent>
            <Typography gutterBottom component='p'>
              {cardData.creator}
            </Typography>
            <Typography component='p'>
              {cardData.isoDate && Formatters.formatDate(cardData.isoDate)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
};

export default withStyles(styles)(readerCard);
