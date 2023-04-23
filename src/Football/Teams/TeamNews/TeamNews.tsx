import React, { useEffect, useState } from 'react';
import RSSReader from '../../components/RSSReader/RSSReader';
import Parser from 'rss-parser';
import { useTranslation } from 'react-i18next';
import {
  EnhancedItem,
  ParsedRSSData,
} from '../../components/RSSReader/RSSReader';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import styles from './TeamNews.module.css';

interface TeamNewsProps {
  teamData: any;
}

const TeamNews = (props: TeamNewsProps) => {
  const [currentFeedList, setCurrentFeedList] = useState({
    feedList: [] as EnhancedItem[] | undefined,
  });

  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   const urls = [
  //     'real-madrid',
  //     'deportivo',
  //     'betis',
  //     'barcelona',
  //     'sevilla',
  //     'malaga',
  //     'mallorca',
  //     'osasuna',
  //     'athletic',
  //     'espanyol',
  //     'villarreal',
  //     'atletico',
  //     'valladolid',
  //     'sporting',
  //     'numancia',
  //     'valencia',
  //     'almeria',
  //     'getafe',
  //   ];

  //   // https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component
  //   let isMounted = false;
  //   const url = props.teamData.name;
  //   const replacedName = url.replace(/ /gi, '-').toLowerCase();

  //   let foundUrl = urls.find((x) => replacedName.includes(x));

  //   if (!foundUrl) {
  //     foundUrl = 'deportivo';
  //   }

  //   const finalUrl = `https://e00-marca.uecdn.es/rss/futbol/${foundUrl}.xml`;

  //   const CORS_PROXY = import.meta.env.VITE_CORS_PROXY;

  //   const parser = new Parser<any, ParsedRSSData>({
  //     customFields: {
  //       item: ['media:content', 'media:thumbnail'],
  //     },
  //   });

  //   parser.parseURL(CORS_PROXY + finalUrl, (err, feed) => {
  //     if (feed) {
  //       if (!isMounted) {
  //         setCurrentFeedList({
  //           feedList: feed.items,
  //         });
  //       }
  //     }
  //   });

  //   return function cleanup() {
  //     isMounted = true;
  //   };
  // }, [props.teamData.id]);

  const url = props.teamData.name;
  const replacedName = url.replace(/ /gi, '-').toLowerCase();

  const twitterAccounts: Record<string, string> = {
    'real-madrid': 'realmadrid',
    'r.c-deportivo': 'RCDeportivo',
    'betis': 'RealBetis',
    'f.c-barcelona': 'FCBarcelona',
    'sevilla': 'SevillaFC',
    'malaga': 'MalagaCF',
    'mallorca': 'RCD_Mallorca',
    'osasuna': 'Osasuna',
    'athletic-de-bilbao': 'AthleticClub',
    'espanyol': 'RCDEspanyol',
    'villarreal': 'VillarrealCF',
    'atlético-de-madrid': 'Atleti',
    'valladolid': 'realvalladolid',
    'sporting': 'RealSporting',
    'numancia': 'cdnumancia',
    'valencia-c.f': 'valenciacf',
    'almeria': 'U_D_Almeria',
    'getafe': 'GetafeCF',
    'racing-de-santander': 'realracingclub',
    'recreativo-de-huelva': 'recreoficial'
  };

  const foundTwitterAccount = twitterAccounts[replacedName];

  return (
    <>
      <h1>{t('teams.news')}</h1>
      {/* {currentFeedList.feedList && (
        <RSSReader feedList={currentFeedList.feedList}></RSSReader>
      )} */}
      <div className={styles.mainContainer} >
        <div style={{ width: '70%' }}>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={foundTwitterAccount || 'LaLiga'}
          />
        </div>
      </div>
    </>
  );
};

export default TeamNews;
