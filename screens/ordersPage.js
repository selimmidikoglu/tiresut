import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View} from 'react-native';

import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from '../components/globalStore';


@observer class OrdersPage extends Component{
    static navigationOptions = {
        header: null
      };

  constructor(props){
      super(props);

  }

  render () {
    return(
        <View style={{flex:1,backgroundColor:'#767887'}}>
        <Text>OrdersPage</Text>
    </View>
    );
        
    
  }
}

export default OrdersPage;