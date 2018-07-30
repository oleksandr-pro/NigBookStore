/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";

import * as COLOR from "../../../config/colors";
import styles from './styles';

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
      selectedIndex:0,
      initialPage:0,
      activeTab:0
     
    }
    this.updateIndex = this.updateIndex.bind(this)
  };

  componentDidMount(){
    this.setState({selectedIndex:0,initialPage:0, activeTab:0});
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  };

  render() {
    const buttons = ['Featured', 'New Books','Categories', 'Best Seller','All'];
    const { selectedIndex, initialPage } = this.state;
    const DATAURLS = ['featured_book','new_books', 'best_sellers','all'];
    
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
          <Container>
          <Tabs
            initialPage={initialPage} page={this.state.activeTab}
            onChangeTab={(i, ref)=> this.setState({selectedIndex:i.i, initialPage:i.i, activeTab:i.i})}
          >
            <Tab
              heading={'Featured'}
              textStyle={{ color: '#fff', fontSize:12 }}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={[{ color: '#fff' }, styles.TabTextStyle]}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
              
              >
               <MyInfinityScroll dataUrl={DATAURLS[0]}/>
              
            </Tab>
            <Tab
              heading={'New Books'}
              textStyle={{ color: '#fff', fontSize:12 }}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={{ color: '#fff', fontSize:12}}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[1]}/>
            </Tab>

            <Tab
              heading={'Categories'}
              textStyle={{ color: '#fff', fontSize:12 }}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={{ color: '#fff', fontSize:12}}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <BookCategories/>
            </Tab>

            <Tab
              heading={'Best Seller'}
              textStyle={{ color: '#fff', fontSize:12 }}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={{ color: '#fff', fontSize:12}}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[2]}/>
            </Tab>
            <Tab
              heading={'All'}
              textStyle={{ color: '#fff', fontSize:12 }}
              tabStyle={{backgroundColor: '#FB8C00'}}
              activeTextStyle={{ color: '#fff', fontSize:12}}
              activeTabStyle={{ backgroundColor: '#388E3C' }}
            >
              <MyInfinityScroll dataUrl={DATAURLS[3]}/>
              
            </Tab>
            
          </Tabs>
          </Container>
        </View>
      </View>
    );
  } // render
} // Dashboard


export default StoreView;
