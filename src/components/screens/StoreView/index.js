/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";

import { connect } from "react-redux";

import * as COLOR from "../../../config/colors";
import styles from './styles';

import { ButtonGroup } from 'react-native-elements'; // 0.17.0
import DownHeaderBar from "../../atoms/DownHeaderBar"
import MyInfinityScroll from "../MyInfinityScroll"

import { Container, Tabs, Tab } from 'native-base'

import BookCategories from "../StoreTabViews/BookCategories";

class StoreView extends Component {
  static navigationOptions = ({navigation}) => ({
    tabBarLabel: "Store"
  }); // navigationOptions

  constructor () {
    super()
    this.state = {
      selectedIndex: 4,
      initialPage:4,
      activeTab:4
     
    }
    this.updateIndex = this.updateIndex.bind(this)
  };

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  };

  render() {
    const buttons = ['Featured', 'New Books','Categories', 'Best Seller','All']
    const { selectedIndex } = this.state
    const DATAURLS = ['featured_book','new_books', 'best_sellers','all']
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BACKGROUND,
          padding:0
        }}
      >
        <View
          style={{
            flex: 1,
            padding:0,
            margin:0,
            flexDirection:'column'
          }}
        >
          <View style={{height:24, marginTop:5}}>
           <DownHeaderBar data={buttons[selectedIndex]}/>
          </View>
          <Tabs
            initialPage={this.state.initialPage} page={this.state.activeTab}
            onChangeTab={(i, ref)=> this.setState({selectedIndex:i.i, initialPage:i.i, activeTab:i.i})}
          >
            <Tab
              heading={'Featured'}
              textStyle={[{ color: '#fff' },styles.TabTextStyle]}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' },styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
              
              >
               <MyInfinityScroll dataUrl={DATAURLS[0]}/>
              
            </Tab>
            <Tab
              heading={'New Books'}
              textStyle={[{ color: '#fff' },styles.TabTextStyle]}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' },styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[1]}/>
            </Tab>

            <Tab
              heading={'Categories'}
              textStyle={[{ color: '#fff' },styles.TabTextStyle]}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' },styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <BookCategories/>
            </Tab>

            <Tab
              heading={'Best Seller'}
              textStyle={[{ color: '#fff' },styles.TabTextStyle]}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' },styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[2]}/>
            </Tab>
            <Tab
              heading={'All'}
              textStyle={[{ color: '#fff' },styles.TabTextStyle]}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' },styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[3]}/>
              
            </Tab>
            
          </Tabs>
        </View>
      </View>
    );
  } // render
} // Dashboard


export default StoreView;
