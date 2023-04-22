import React, { useEffect, useState } from 'react';
import RSSReader from '../../components/RSSReader/RSSReader';
import Parser from 'rss-parser';
import { useTranslation } from 'react-i18next';
import {
  EnhancedItem,
  ParsedRSSData,
} from '../../components/RSSReader/RSSReader';

interface TeamNewsProps {
  teamData: any;
}

const TeamNews = (props: TeamNewsProps) => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as EnhancedItem[] | undefined,
  });

  const { t, i18n } = useTranslation();

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

    const CORS_PROXY = import.meta.env.VITE_CORS_PROXY;

    const parser = new Parser<any, ParsedRSSData>({
      customFields: {
        item: ['media:content', 'media:thumbnail'],
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
    <>
      <h1>{t('teams.news')}</h1>
      {currentFeedList.feedList && (
        <RSSReader feedList={currentFeedList.feedList}></RSSReader>
      )}
    </>
  );
};

export default TeamNews;
