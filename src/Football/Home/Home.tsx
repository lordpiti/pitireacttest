import React, { useState, useEffect } from 'react';
import RSSReader, {
  EnhancedItem,
  ParsedRSSData,
} from '../components/RSSReader/RSSReader';
import Parser from 'rss-parser';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import styles from './Home.module.css';

const Home = () => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as EnhancedItem[] | undefined,
  });

  // useEffect(() => {
  //   const parser = new Parser<any, ParsedRSSData>({
  //     customFields: {
  //       item: [['media:content', 'media:thumbnail']],
  //     },
  //   });

  //   parser.parseURL(
  //     `${import.meta.env.VITE_CORS_PROXY}${import.meta.env.VITE_HOME_RSS_FEED}`,
  //     (err, feed) => {
  //       if (feed) {
  //         setCurrentFeedList({
  //           feedList: feed.items,
  //         });
  //       }
  //     }
  //   );
  // }, []);

  return (
    // <RSSReader feedList={currentFeedList.feedList}></RSSReader>
    <div className={styles.mainContainer}>
      <div style={{ width: '40%' }}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="LaLiga"
        />
      </div>
    </div>
  );
};

export default Home;
