import React from 'react';
import Parser from 'rss-parser';
import ReaderCard from './ReaderCard/ReaderCard';

interface RSSReaderProps {
  feedList: any[] | undefined;
}

const RSSReader = (props: RSSReaderProps) => {
  let newsList = null;
  if (props.feedList) {
    newsList = props.feedList.map((feedItem, index) => {
      feedItem.index = index + 1;
      return (
        <div key={index} className='col-md-3 col-sm-4 col-xs-6'>
          <ReaderCard cardData={feedItem}></ReaderCard>
        </div>
      );
    });
  }

  return <div className='row'>{newsList}</div>;
};

export default RSSReader;
