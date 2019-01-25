import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View, TouchableOpacity} from 'react-native';

import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from '../components/globalStore';

import { createAppContainer } from "react-navigation";

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import HomePage from './homePage';
import OrdersPage from './ordersPage';
import ProfilePage from './profilePage';
import AdressesPage from './adressesPage';

const RootStack = createMaterialBottomTabNavigator({

    HomePage: {screen: HomePage},
    OrdersPage: {screen: OrdersPage},
    ProfilePage: {screen: ProfilePage},
    AdressesPage: {screen: AdressesPage}
},
{
    initialRouteName: 'HomePage',
    order:['HomePage','AdressesPage','OrdersPage','ProfilePage'],
    activeTintColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
)
 
const BottomNavigation = createAppContainer(RootStack);

export default BottomNavigation;
    



    
        
  