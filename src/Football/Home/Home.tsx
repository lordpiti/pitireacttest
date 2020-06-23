import React, { useState, useEffect } from 'react';
import RSSReader from '../components/RSSReader/RSSReader';
import Parser from 'rss-parser';

const Home = () => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as Parser.Item[] | undefined,
  });

  useEffect(() => {
    const parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media:content'],
          ['media:thumbnail', 'media:thumbnail'],
        ],
      },
    });
    const CORS_PROXY = process.env.REACT_APP_CORS_PROXY as any;
    parser.parseURL(
      CORS_PROXY + process.env.REACT_APP_HOME_RSS_FEED,
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
