
import React, { Component } from 'react';
import {

    TouchableOpacity,
    View,
    Dimensions,
    TouchableHighlight,
   Alert,
  } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, ActionSheet } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob'
import Loader from '../../atoms/Loader';
import RNFS from 'react-native-fs';

var BUYBUTTONS=['Buy', 'Cancel'];
var WISHBUTTONS=['Ok', 'Cancel'];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

export default class NativeItemModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNode:{
                'title':'',
                'Rating':'',
                'Author Name':'',
                'Body':'',
                'Pages':'',
                'Path':'',
                'Publisher':'',
                'Language':'',
                'Image':{
                    'src':'http://bit.ly/2GfzooV',
                    'alt':''
                }
            },
            loading: false,
        }
    }
    
    componentDidUpdate(prevprops){
        if(prevprops.selectedItem!==this.props.selectedItem){
            if (typeof(this.props.selectedItem) !=='undefined'){
                this.setState({selectedNode:this.props.selectedItem.node});
            } 
            
        }
    }

    doDownload(){

        this.setState({loading:true});
        let path = RNFS.DocumentDirectoryPath+'/www'+'/downloaded1.epub';
        RNFS.mkdir(RNFS.DocumentDirectoryPath+'/www').then(()=>{
            RNFS.downloadFile({fromUrl:'https://zacsbooks.com/sites/default/files/Christmas_in_Nigeria_Converted_Cleaned_Ready_4.epub', toFile: path}).promise.then(res => {
            console.log('The file saved to ', res.statusCode)
            this.setState({loading:false});
            this.props.onAdd();
            this.props.onDismiss();
            Alert.alert('Success', 'This book has downloaded!')
          })
          .catch((err)=>{
              console.log('err', err);
              this.setState({loading:false});

              this.props.onDismiss();
              Alert.alert('Failed', 'This book has not downloaded!')
          });

        })
        
    }
    
    render() {
        console.log("selected", this.props.selectedItem);
        
        const { width, height } = Dimensions.get('window')
      return (
          <View>
              <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.modalVisible}
              onRequestClose={() => { this.props.onDismiss() }}
              >            
                  <View style={styles.container}>
                  <Loader
                        loading={this.state.loading} />
                    <Container style={{backgroundColor:'transparent', flex:1, justifyContent:'center',alignContent:'center'}}>                        
                        <Content style={{backgroundColor:'transparent'}}>
                        <Card style={{flex: 1}}>
                            <CardItem bordered>
                            <Left>
                                <Thumbnail source={require('../../../assets/img/ic_launcher_round.png')} width={35} heigth={35} />
                                <Body>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                                            <Text numberOfLines={2} ellipsizeMode ={'tail'} noteFontSize={15}>{this.state.selectedNode.title}</Text>
                                        </View>
                                        <Button transparent textStyle={{color: '#87838B', marginRight:-15}}  onPress={() => this.props.onDismiss()}>
                                        <Icon name="close" />                                       
                                        </Button>
                                    </View>
                                
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem bordered>                              
                                <Body>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, }}>
                                            <Image source={{uri: this.state.selectedNode.Image.src}} style={{ flex: 1, height:200}}/>
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5}}>
                                            <Text numberOfLines={1} ellipsizeMode ={'tail'}>{this.state.selectedNode['Authors']}</Text>
                                            <Text> Price: {this.state.selectedNode.Price} </Text>
                                            <Text> Pages: {this.state.selectedNode.Pages}</Text>
                                            <Text>{this.state.selectedNode.Language}</Text>
                                            <Text></Text>
                                            <View style={{flexDirection:'column',justifyContent:'center', alignItems:'center' }}>
                                            <Button primary small 
                                                    onPress={()=>
                                                        ActionSheet.show(
                                                            {
                                                                options: BUYBUTTONS,
                                                                cancelButtonIndex: CANCEL_INDEX,
                                                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                title: "Do you want to buy this book?"
                                                            },
                                                            buttonIndex => {
                                                                if (buttonIndex === 0){
                                                                    this.doDownload();
                                                                }
                                                               
                                                            }
                                                            )}
                                            >
                                                <Text>BUY NOW </Text>                                           
                                            </Button>
                                            <Button danger small style={{marginTop:10}}
                                                    onPress={()=>
                                                        ActionSheet.show(
                                                            {
                                                                options: WISHBUTTONS,
                                                                cancelButtonIndex: CANCEL_INDEX,
                                                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                                title: "Add this book to wish list."
                                                            },
                                                            buttonIndex => {
                                                                if (buttonIndex === 0){
                                                                    this.props.onAddWISH();
                                                                    this.props.onDismiss();
                                                                }                                                               
                                                            }
                                                            )}
                                            >
                                                <Text>WISHLIST </Text>                                           
                                            </Button>
                                            </View>                                          
                                       </View>
                                    </View>                                
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={{color:'gray'}}>Description</Text>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <View style={{paddingTop:5}}>
                                        <Text >
                                        {this.state.selectedNode.Body}
                                        </Text>
                                    </View>
                                </Body>

                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Text style={{color:'gray'}}>ISBN: {this.state.selectedNode.ISBN}</Text>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Text style={{color:'gray'}}>Publisher: {this.state.selectedNode.Publisher}</Text>
                                </Left>
                            </CardItem>
                           
                            <CardItem >
                                <Left>
                                    <Text style={{color:'gray'}}>Rating</Text>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Text >{this.state.selectedNode.Rating}</Text>
                                </Left>
                            </CardItem>
                            <CardItem footer bordered>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}  onPress={() => this.props.onDismiss()}>
                                <Icon name="close" />
                                <Text>CLOSE</Text>
                                </Button>
                            </Left>
                            </CardItem>
                        </Card>
                        </Content>
                    </Container>
                  </View>
              </Modal>
          </View>
      );
    }
  }