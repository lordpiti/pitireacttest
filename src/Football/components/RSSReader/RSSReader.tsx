import React, { Component } from 'react';
import Parser from 'rss-parser';
import ReaderCard from './ReaderCard/ReaderCard';

interface RSSReaderProps {
  feedList: Parser.Item[] | undefined;
}

class RSSReader extends Component<RSSReaderProps> {
  constructor(props: RSSReaderProps) {
    super(props);
  }

  componentDidMount() {
    // const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;
    // let parser = new Parser({
    //   customFields: {
    //     item: [
    //       ['media:content', 'media:content'],
    //       ['media:thumbnail', 'media:thumbnail'],
    //     ],
    //   },
    // });
    // parser.parseURL(CORS_PROXY + this.props.feedUrl, (err, feed) => {
    //   if (feed) {
    //     if (this._isMounted) {
    //       this.setState({
    //         feedList: feed.items,
    //       });
    //     }
    //   }
    // });
  }

  // componentDidUpdate(props: RSSReaderProps) {
  //   if (props.feedUrl !== this.props.feedUrl) {
  //     const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;

  //     let parser = new Parser({
  //       customFields: {
  //         item: [
  //           ['media:content', 'media:content'],
  //           ['media:thumbnail', 'media:thumbnail'],
  //         ],
  //       },
  //     });

  //     this._isMounted = true;

  //     parser.parseURL(CORS_PROXY + this.props.feedUrl, (err, feed) => {
  //       if (feed) {
  //         //if (this._isMounted) {
  //         this.setState({
  //           feedList: feed.items,
  //         });
  //         //}
  //       }
  //     });
  //   }
  // }

  componentWillUnmount() {
    // this._isMounted = false;
  }

  render() {
    let newsList = null;
    if (this.props.feedList) {
      newsList = this.props.feedList.map((feedItem, index) => {
        feedItem.index = index + 1;
        return (
          <div key={index} className='col-md-3 col-sm-4 col-xs-6'>
            <ReaderCard cardData={feedItem}></ReaderCard>
          </div>
        );
      });
    }

    return <div className='row'>{newsList}</div>;
  }
}

export default RSSReader;
