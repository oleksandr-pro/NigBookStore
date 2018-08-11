/* @flow */

import React, { Component } from "react";
import { View, AsyncStorage} from "react-native";
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
import Loader from '../../../atoms/Loader';
import RNFS from 'react-native-fs';
import Data from '../../../../books.json'


class Mread extends Component {
 
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            books:[],
            loading:false
        };
    }
  componentWillReceiveProps(nextProps){
      if(nextProps.books.length!==this.props.books.length){
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data === null){
                AsyncStorage.setItem('data', JSON.stringify(Data.books));
            } else {
                this.props.getBooks();
                this.setState({books:nextProps.books});
            }  
        });
      }

  }

  componentDidMount(){
    AsyncStorage.getItem('data', (err, data) => {
        //if it doesn't exist, extract from json file
        //save the initial data in Async
        if (data === null){
            AsyncStorage.setItem('data', JSON.stringify(Data.books));
        } else {
            this.props.getBooks();
            this.setState({books:this.props.books});
        }

    });
  }
  likeBook(book){
      book['like']=true;
      this.props.updateBook(book);
  }

  deleteBook(book){
    this.setState({loading:true});
    let path = RNFS.DocumentDirectoryPath+'/www'+'/downloaded1.epub';
    RNFS.exists(path)
        .then((res) => {
            this.setState({loading:false});
            console.log('file exist: ', res);
            if (res){
                return RNFS.unlink(filepath)
                .then(() => {
                console.log('FILE DELETED');
                    book['wish'] = true;
                    this.props.updateBook(book);
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                console.log(err.message);
                });
            }

        })
        .catch((err) => {
            this.setState({loading:false});
            console.log(err.message);
            book['wish'] = true;
            this.props.updateBook(book);
        });
        
    
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
                    <Loader
                        loading={this.state.loading} />
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

