import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View} from 'react-native';
import FirstPage from './firstPage';
import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from './globalStore';

@observer class SecondPage extends Component{
constructor(props){
    super(props);
    this.state = {
            secondPageText: '',
            goToFirstPage:'',
        }
  }
  goToFirstPage(){
    this.setState({goToFirstPage: true})
  }
  render () {
      if (!this.state.goToFirstPage) {
        return (
          <View style={{flex: 1, height: '100%', width: '100%',alignItems:'center',justifyContent:'center',backgroundColor:'gray'}}>
            
            <View style={{height:60,width:100,backgroundColor: 'cyan'}}>
            <Text>{GlobalStore.text}</Text>
              <TextInput placeholder={GlobalStore.text} onChangeText={(text) => GlobalStore.changeText(text)}></TextInput>
            </View>
            <View style={{height:60,width:100,backgroundColor: 'cyan'}}>
              <Button title="Admin Sayfası" onPress= {() => this.goToFirstPage()}></Button>
            </View>
            
          </View>
        )
      }
      else{
        return (<FirstPage/>)
      }
    
  }
}

export default SecondPage;