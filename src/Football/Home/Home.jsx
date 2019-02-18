import React, { Component } from 'react';
import RSSReader from '../components/RSSReader/RSSReader';

class Home extends Component {

    render() {
        return <div>
            {/* <div className={styles.tuMadre}>HAHA</div> */}
            <RSSReader feedUrl={process.env.REACT_APP_HOME_RSS_FEED}></RSSReader>
            {/* <img src="/assets/img/barcelona2015.jpg" alt="" className="img-fluid"></img> */}
        </div>;
    }
    
}

export default Home;