/* @flow */

import React, { Component } from "react";
import { View} from "react-native";
var {
    ListView,
    ActivityIndicator
} = require('react-native');
import { bindActionCreators } from "redux";
import * as bookActions from "../../../../actions/books_actions";
import { connect } from "react-redux";
import {Content, List} from 'native-base';
import ShelfCard from "../../../molecules/ShelfCard";
import styles from "./styles";
import HalfShelfCard from "../../../molecules/halfShelfCard";
import GridList from 'react-native-grid-list';

class Mwishlist extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            books:[]
        };
    }
  componentWillReceiveProps(nextProps){
      if(nextProps!==this.props){
            this.filtering(nextProps.books);
      }

  }
  filtering(realbooks){
    rebooks = [];
    for (book in realbooks){
        if (realbooks[book]['wish']===true && realbooks[book]['read']===false){
            rebooks.push(realbooks[book]);
        }
    }
    console.log('filtered books', rebooks);
    this.setState({books:rebooks}); 
  }
  componentDidMount(){
      this.props.getBooks();
        this.filtering(this.props.books);

  }

  renderItem = ({ item, index }) => (

    <HalfShelfCard
        screenProps ={this.props.screenProps}
        book ={item}
        upreBook={()=>{this.props.screenProps.navigate('Epub', { name: 'Jane' })}}
        state = {'wish'}
    />

  );
 
  render() {
      console.log('screenProps', this.props.screenProps);
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        size="small"
                    />
                </View>
            );
        } else {   
            return (
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>

                <Content>
                    <GridList
                    
                    numColumns={3}
                    data={this.state.books}
                    renderItem={this.renderItem}
                    
                    >
                    
                </GridList>
                </Content>

                </View>
            );
        }
    }

} 

function mapStateToProps(state, props) {
    return {
        loading: state.booksControl.loading,
        books: state.booksControl.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(bookActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Mwishlist);

