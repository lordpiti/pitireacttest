import Parser from 'rss-parser';
import ReaderCard from './ReaderCard/ReaderCard';
import './RSSReader.scss';

interface RSSReaderProps {
  feedList: EnhancedItem[] | undefined;
}

export interface ParsedRSSData {
  'media:content': { $: { url: string } };
  'media:thumbnail': { $: { url: string } };
  index: number;
}

export type EnhancedItem = ParsedRSSData & Parser.Item;

const RSSReader = (props: RSSReaderProps) => {
  let newsList = null;
  if (props.feedList) {
    newsList = props.feedList.map((feedItem, index) => {
      feedItem.index = index + 1;
      return (
        <div key={index}>
          <ReaderCard cardData={feedItem}></ReaderCard>
        </div>
      );
    });
  }

  return <div className='rss-reader'>{newsList}</div>;
};

export default RSSReader;
