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
      url:"",
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
    const { navigation } = this.props;
    const {path} = navigation.state.params;
    console.log('path', path);
    this.streamer.start()
      .then((origin) => {
        console.log("Served from:", origin);
        this.streamer.check(`http://localhost:8899/${path}`).then((t) => {
              console.log("checking", t);
              if (!t){
                return navigation.goBack();
              }
          });
        return this.streamer.add(`http://localhost:8899/${path}`);
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
              src={this.state.src}
              flow={this.state.flow}
              location={this.state.location}
              onLocationChange={(visibleLocation)=> {
                console.log("locationChanged", visibleLocation)
                this.setState({visibleLocation});
              }}
              onLocationsReady={(locations)=> {
                this.setState({sliderDisabled : false});
              }}
              onReady={(book)=> {
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
                rendition.highlight(cfiRange, {});
              }}
              onMarkClicked={(cfiRange) => {
                console.log("mark clicked", cfiRange)
              }}
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
