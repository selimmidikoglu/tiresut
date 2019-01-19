import React, {Component} from 'react';
import {Platform, StyleSheet, Button, TextInput, Text, View} from 'react-native';
import SecondPage from './secondPage';
import { observer } from "mobx-react/native";
import GlobalStore from './globalStore';



@observer class FirstPage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      firstPageText: '',
      goToSecondPage: false
    };
  }
  goToSecondPage(){
    this.setState({goToSecondPage: true})
  }
  render () {
      if (!this.state.goToSecondPage) {
        return (
          <View style={{flex: 1, height: '100%', width: '100%',alignItems:'center',justifyContent:'center',backgroundColor:'gray'}}>
            <View style={{height:60,width:100,backgroundColor: 'cyan'}}>
            <Text>{GlobalStore.text}</Text>
              <TextInput placeholder="irfan" onChangeText={(text) => GlobalStore.changeText(text)}></TextInput>
            </View>
            <View style={{height:60,width:100,backgroundColor: 'cyan'}}>
              <Button title="İkinci Sayfaya Git" onPress= {() => this.goToSecondPage()}></Button>
            </View>
            
          </View>
        )
      }
      else{
        return (<SecondPage/>)
      }
    
  }
}

export default FirstPage;
