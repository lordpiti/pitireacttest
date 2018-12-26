import React, { Component } from 'react';
import RSSReader from '../components/RSSReader/RSSReader';

class Home extends Component {

    render() {
        return <div>
            <RSSReader feedUrl="https://e00-marca.uecdn.es/rss/portada.xml"></RSSReader>
            {/* <img src="/assets/img/barcelona2015.jpg" alt="" className="img-fluid"></img> */}
        </div>;
    }
    
}

export default Home;