import React, {Component  } from 'react';
import {Platform, Image,StyleSheet, Dimensions,TextInput,Text, ScrollView,Button, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, View,ActivityIndicator} from 'react-native';


 class FirstPage extends Component {
  
  render () {
    return (
      
      <View style={{ flex: 1}} >
        <Button title="Go to second" onPress={()=>this.props.navigation.navigate('SecondPage')}></Button>
            
      </View>
      
    );
  }
}


export default FirstPage;
