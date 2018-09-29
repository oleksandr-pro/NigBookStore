/* @flow */

import React, { Component } from "react";
import { View, AsyncStorage, TouchableOpacity, Text} from "react-native";
var {
    ListView,
    ActivityIndicator
} = require('react-native');
import { bindActionCreators } from "redux";
import * as bookActions from "../../../../services/actions/books_actions";
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
            onloading:false
        };
    }

  componentWillMount(){
    AsyncStorage.getItem('data', (err, data) => {
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
    let {localpath=''} = book;
    if (localpath===''){
        console.log('already deleted', book);
        return null;
    }
    let path = RNFS.DocumentDirectoryPath+'/www/'+localpath;
    RNFS.exists(path)
        .then((res) => {
            this.setState({onloading:false});
            console.log('file exist: ', res);
            if (res){
                return RNFS.unlink(filepath)
                .then(() => {
                console.log('FILE DELETED');
                    book['wish'] = true;
                    book['localpath'] = '';
                    this.props.updateBook(book);
                })
                .catch((err) => {
                console.log(err.message);
                });
            } else {
                book['wish'] = true;
                book['localpath'] = '';
                this.props.updateBook(book);
            }
        })
        .catch((err) => {
            this.setState({onloading:false});
            console.log(err.message);
            book['wish'] = true;
            this.props.updateBook(book);
        });
  }
  render() {
      console.log('screenProps', this.props.screenProps);
      const {books=[]} = this.props;
      let read_books = [];
      books.map((item, index)=>{
          if (item.read ===true && item.wish ===false) {
            read_books.push(item);
          }
      })
      const {screenProps} = this.props;
        if(read_books.length===0){
            return (
            <View style={{flex: 1, backgroundColor: '#eaeaea', justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.screenProps.navigate('Store')}>
                    <Text style={{color:'#666666', fontWeight:'bold', fontSize:17}}>
                    Please download books from bookshop.
                    </Text>
                </TouchableOpacity>
                
            </View>) 
        }
            return (
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                    <Loader
                        loading={this.state.onloading} />
                    <Content>
                    <List>
                    {books.map((item, index) => {
                        
                        return (
                        <View key={index}>
                            {item.read ===true && item.wish ===false
                                ?<ShelfCard
                                 book ={item} 
                                 deleteBook={()=>this.deleteBook(item)}
                                 upreBook={()=>{this.props.readProps.navigate('Epub', { path: item.localpath })}}
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

