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

class Mread extends Component {
 
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            books:[]
        };
    }
  componentWillReceiveProps(nextProps){
      if(nextProps!==this.props){

          this.setState({books:nextProps.books});
      }

  }

  componentDidMount(){
      this.props.getBooks();
      this.setState({books:this.props.books});

  }
  likeBook(book){
      book['like']=true;
      this.props.updateBook(book);
  }
  deleteBook(book){
    book['wish'] = true;
    this.props.updateBook(book);
  }


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
                    <List>
                    {this.state.books.map((item, index) => {
                        
                        return (
                        <View key={index}>
                            {item.read ===true && item.wish ===false
                                ?<ShelfCard
                                 screenProps ={this.props.screenProps} 
                                 book ={item} 
                                 deleteBook={()=>this.deleteBook(item)}
                                 upreBook={()=>{this.props.screenProps.navigate('Epub', { name: 'Jane' })}}
                                 likeBook={()=>this.likeBook(item)}
                                 />
                                :<View/>
                            }
                        </View>
                        )
                    })}
                </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mread);

