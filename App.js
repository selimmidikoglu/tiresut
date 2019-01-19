import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Entry from './components/entry';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomePage from './components/homePage';
import SecondPage from './components/secondPage';
class App extends Component{
  render() {
    return (
      <Entry/>
    );
  }
}


const AppNavigator = createStackNavigator({
  App: {
    screen: Entry,

  },
  HomePage: {
    screen: HomePage,
  },
  SecondPage : {
    screen: SecondPage,
  }
});

export default createAppContainer(AppNavigator);