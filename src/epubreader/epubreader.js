import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  StatusBar
} from 'react-native';

import { Epub, Streamer} from "epubjs-rn";
import TopBar from './elements/TopBar'
import BottomBar from './elements/BottomBar'
import Nav from './elements/Nav'
import RNFetchBlob from 'react-native-fetch-blob'


class EpubReader extends Component {
  constructor(props) {
    super(props);
    window.DOMParser = require('xmldom').DOMParser;
    this.state = {
      flow: "paginated", // paginated || scrolled-continuous
      location: 6,
      url: "file:///data/user/0/com.reactor/files/downloaded1.epub",
      // "https://zacsbooks.com/sites/default/files/Christmas_in_Nigeria_Converted_Cleaned_Ready_4.epub",
      src: "",
      origin: "",
      title: "",
      toc: [],
      showBars: true,
      showNav: false,
      sliderDisabled: true
    };

    this.streamer = new Streamer({port: '8899', root:'www'});
  }

  componentDidMount() {

    this.streamer.start()
      .then((origin) => {
        console.log("Served from:", origin);
        // this.setState({origin})
        this.streamer.check('http://localhost:8899/downloaded1.epub').then((t) => console.log("checking", t));
        return this.streamer.add("http://localhost:8899/downloaded1.epub");
        // return this.streamer.get(this.state.url);
      })
      .catch((error) => console.warn("fetch error:", error))
      .then((src) => {
        console.log("Loading from:", src);
        console.log("src", src);
        return this.setState({src});
      });

    setTimeout(() => this.toggleBars(), 1000);
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  toggleBars() {
    this.setState({ showBars: !this.state.showBars });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={!this.state.showBars}/>
        <Epub style={styles.reader}
              ref="epub"
              //src={"https://s3.amazonaws.com/epubjs/books/moby-dick.epub"}
              src={this.state.src}
              flow={this.state.flow}
              location={this.state.location}
              onLocationChange={(visibleLocation)=> {
                console.log("locationChanged", visibleLocation)
                this.setState({visibleLocation});
              }}
              onLocationsReady={(locations)=> {
                // console.log("location total", locations.total);
                this.setState({sliderDisabled : false});
              }}
              onReady={(book)=> {
                // console.log("Metadata", book.package.metadata)
                // console.log("Table of Contents", book.toc)
                this.setState({
                  title : book.package.metadata.title,
                  toc: book.navigation.toc
                });
              }}
              onPress={(cfi, position, rendition)=> {
                this.toggleBars();
                console.log("press", cfi);
              }}
              onLongPress={(cfi, rendition)=> {
                console.log("longpress", cfi);
              }}
              onViewAdded={(index) => {
                console.log("added", index)
              }}
              beforeViewRemoved={(index) => {
                console.log("removed", index)
              }}
              onSelected={(cfiRange, rendition) => {
                console.log("selected", cfiRange)
                // Add marker
                rendition.highlight(cfiRange, {});
              }}
              onMarkClicked={(cfiRange) => {
                console.log("mark clicked", cfiRange)
              }}
              // themes={{
              //   tan: {
              //     body: {
              //       "-webkit-user-select": "none",
              //       "user-select": "none",
              //       "background-color": "tan"
              //     }
              //   }
              // }}
              // theme="tan"
              // regenerateLocations={true}
              // generateLocations={true}
              // origin={this.state.origin}
              onError={(message) => {
                console.log("EPUBJS-Webview", message);
              }}
            />
            <View
              style={[styles.bar, { top:0 }]}>
              <TopBar
                title={this.state.title}
                shown={this.state.showBars}
                onLeftButtonPressed={() => this._nav.show()}
                onRightButtonPressed={
                  (value) => {
                    if (this.state.flow === "paginated") {
                      this.setState({flow: "scrolled-continuous"});
                    } else {
                      this.setState({flow: "paginated"});
                    }
                  }
                }
               />
            </View>
            <View
              style={[styles.bar, { bottom:0 }]}>
              <BottomBar
                disabled= {this.state.sliderDisabled}
                value={this.state.visibleLocation ? this.state.visibleLocation.start.percentage : 0}
                shown={this.state.showBars}
                onSlidingComplete={
                  (value) => {
                    this.setState({location: value.toFixed(6)})
                  }
                }/>
            </View>
            <View>
              <Nav ref={(nav) => this._nav = nav }
                display={(loc) => {
                  this.setState({ location: loc });
                }}
                toc={this.state.toc}
              />
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C'
  },
  bar: {
    position:"absolute",
    left:0,
    right:0,
    height:55
  }
});

export default EpubReader;
