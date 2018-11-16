import React, { Component } from 'react';
import RSSReader from '../../components/RSSReader/RSSReader';

class TeamNews extends Component {

    render() {
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
            'almeria'
        ];

        const url = this.props.teamData.name;
        const replacedName = url.replace(/ /gi, "-").toLowerCase();

        let foundUrl = urls.find(x=> replacedName.includes(x));

        if (!foundUrl) {
            foundUrl = 'deportivo'
        }

        return <div>
            <h1>Team news</h1>
            <RSSReader feedUrl={`https://e00-marca.uecdn.es/rss/futbol/${foundUrl}.xml`}></RSSReader>
        </div>
    }

}

export default TeamNews;