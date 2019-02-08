import React, { Component } from 'react';
import Parser from 'rss-parser';
import ReaderCard from './ReaderCard/ReaderCard';

class RSSReader extends Component {

  state = {
    feedList: []
  }

  componentDidMount() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    let parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media:content'],
        ]
      }
    })

    parser.parseURL(CORS_PROXY + this.props.feedUrl, (err, feed) => {
      if (feed) {
        this.setState({
          feedList: feed.items
        });
      }
    })
  }

  render() {
    let newsList = null;
    if (this.state.feedList) {
      newsList = this.state.feedList.map((feedItem, index) =>{
        feedItem.index = index+1
        return <div key={index} className="col-md-3 col-sm-4 col-xs-6">
          <ReaderCard cardData={feedItem}></ReaderCard>
        </div>
      }
      )
    }

    return <div className="row">
     {newsList}
    </div>; 

  }

}

export default RSSReader;