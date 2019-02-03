import React, { Component } from 'react';
import RSSReader from '../components/RSSReader/RSSReader';
import styles from './Home.module.css';

class Home extends Component {

    render() {
        return <div>
            {/* <div className={styles.tuMadre}>HAHA</div> */}
            <RSSReader feedUrl="https://e00-marca.uecdn.es/rss/portada.xml"></RSSReader>
            {/* <img src="/assets/img/barcelona2015.jpg" alt="" className="img-fluid"></img> */}
        </div>;
    }
    
}

export default Home;