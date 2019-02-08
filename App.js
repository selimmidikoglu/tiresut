import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Entry from './components/entry';
import { createStackNavigator, createAppContainer } from "react-navigation";
import TheNav from './denemePages/thenav';
import BottomNavigation from './screens/bottomNavigation';


class App extends Component{
  render(){
    return(
      <Entry/>
    )
  }
}

/*const AppNavigator = createStackNavigator(
  { 
    BottomNavigation: {
      screen: BottomNavigation,
      headerMode : null,
      navigationOptions: () => ({
        title: `B`,
        header:null
      }),
    },
    Entry: {
      screen: Entry,
      headerMode : null,
      navigationOptions: () => ({
        header:null,  
      }),
    },
   
    
  },
  {initialRouteName : 'Entry'}
);
const App = createAppContainer(AppNavigator)*/
export default App;