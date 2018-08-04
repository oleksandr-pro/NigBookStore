
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight
  } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from 'react-native-modal';
import styles from './styles';
import MyInfinityScroll from '../../screens/MyInfinityScroll';

export default class CategoryModal extends Component {
    constructor(props){
        super(props);
        this.state = {
          selectedCategory:{
            'title':'',
            'url':''
          }
        }
    }

    componentDidUpdate(prevprops){
        if(prevprops.selectedItem!==this.props.selectedItem){
            if (typeof(this.props.selectedItem) !=='undefined'){
                this.setState({selectedCategory:this.props.selectedItem});
            } 
            
        }
    }
    
    render() {
        console.log("selected", this.props.selectedItem);
        const { width, height } = Dimensions.get('window');
        const{title, url} = this.props.selectedItem;
      return (
          <View>
              <Modal
              animationType="slide"
              transparent={false}
              visible={this.props.modalVisible}
              onRequestClose={() => { this.props.onDismiss() }}
              style = {{padding:0, margin:0}}
              >
                  <View style={styles.container}>                
                    <View 
                        style={styles.closeIconContainer}
                    >   
                        <View style={{flex:1}}/>
                        <TouchableHighlight                        
                        onPress={() => this.props.onDismiss() }
                        >
                        <Icon size={20} color={'#000000'} name="close"/>
                        </TouchableHighlight>
                      </View>
                    <Text style={{color:'#536DFE', fontSize:20, marginBottom:10}}>{title}</Text>
                    <View 
                        style={styles.scrollContainer}
                    >  
                      <MyInfinityScroll dataUrl={'featured_book'}/>
                    </View>                 
                    </View>
              </Modal>
          </View>
      );
    }
  }