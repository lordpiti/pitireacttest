import React, { useState, useEffect } from 'react';
import RSSReader, {
  EnhancedItem,
  ParsedRSSData,
} from '../components/RSSReader/RSSReader';
import Parser from 'rss-parser';

const Home = () => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as EnhancedItem[] | undefined,
  });

  useEffect(() => {
    const parser = new Parser<any, ParsedRSSData>({
      customFields: {
        item: [['media:content', 'media:thumbnail']],
      },
    });

    parser.parseURL(
      `${process.env.REACT_APP_CORS_PROXY}${process.env.REACT_APP_HOME_RSS_FEED}`,
      (err, feed) => {
        if (feed) {
          setCurrentFeedList({
            feedList: feed.items,
          });
        }
      }
    );
  }, []);

  return (
    <div>
      {/* <div className={styles.tuMadre}>HAHA</div> */}
      <RSSReader feedList={currentFeedList.feedList}></RSSReader>
      {/* <img src="/assets/img/barcelona2015.jpg" alt="" className="img-fluid"></img> */}
    </div>
  );
};

export default Home;
