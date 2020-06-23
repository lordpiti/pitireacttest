import React, { useEffect, useState } from 'react';
import RSSReader from '../../components/RSSReader/RSSReader';
import Parser from 'rss-parser';

interface TeamNewsProps {
  teamData: any;
}

const TeamNews = (props: TeamNewsProps) => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as Parser.Item[] | undefined,
  });

  useEffect(() => {
    const urls = [
      'real-madrid',
      'deportivo',
      'betis',
      'barcelona',
      'sevilla',
      'malaga',
      'mallorca',
      'osasuna',
      'athletic',
      'espanyol',
      'villarreal',
      'atletico',
      'valladolid',
      'sporting',
      'numancia',
      'valencia',
      'almeria',
      'getafe',
    ];

    // https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = false;
    const url = props.teamData.name;
    const replacedName = url.replace(/ /gi, '-').toLowerCase();

    let foundUrl = urls.find((x) => replacedName.includes(x));

    if (!foundUrl) {
      foundUrl = 'deportivo';
    }

    const finalUrl = `https://e00-marca.uecdn.es/rss/futbol/${foundUrl}.xml`;

    const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;

    let parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media:content'],
          ['media:thumbnail', 'media:thumbnail'],
        ],
      },
    });

    parser.parseURL(CORS_PROXY + finalUrl, (err, feed) => {
      if (feed) {
        if (!isMounted) {
          setCurrentFeedList({
            feedList: feed.items,
          });
        }
      }
    });

    return function cleanup() {
      isMounted = true;
    };
  }, [props.teamData.id]);

  return (
    <div>
      <h1>Team news</h1>
      {currentFeedList.feedList && (
        <RSSReader feedList={currentFeedList.feedList}></RSSReader>
      )}
    </div>
  );
};

export default TeamNews;
