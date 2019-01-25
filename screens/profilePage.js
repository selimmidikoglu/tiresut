import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View} from 'react-native';

import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from '../components/globalStore';


@observer class ProfilePage extends Component{
    static navigationOptions = {
        header: null
      };

  constructor(props){
      super(props);

  }

  render () {
    return(
        <View style={{flex:1,backgroundColor:'#768998'}}>
             <Text>ProfilePage</Text>
        </View>
    );
        
    
  }
}

export default ProfilePage;