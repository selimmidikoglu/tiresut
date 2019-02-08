import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer,createBottomTabNavigator } from "react-navigation";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import FirstPage from './first';
import SecondPage from './second';
import ThirdPage from './third';


const RootStack = createBottomTabNavigator({

    FirstPage: {
        screen: FirstPage,
        navigationOptions:{
            tabBarLabel:'Ürünler',
            tabBarIcon:({tintColor}) => (
            <Icon name="ios-home" size={27} color="black"/>
            )
        }
    },
    SecondPage: {screen: SecondPage,
        navigationOptions:{
            tabBarLabel:'Siparişler',
            tabBarIcon:({tintColor}) => (
            <Icon name="md-reorder" size={27} color="white"/>
            )
        }
    },
    ThirdPage: {screen: ThirdPage,
        navigationOptions:{
            tabBarLabel:'Profil',
            tabBarIcon:({tintColor}) => (
            <Icon name="ios-person" size={27} color="white"/>
            )
        }
    },
   
},
{
    /*initialRouteName: 'HomePage',
    order:['HomePage','AdressesPage','OrdersPage','ProfilePage'],
    activeTintColor: 'white',
    inactiveColor: 'white',
    barStyle: { backgroundColor: '#f50057' },*/
  }
)
 
const TheNav = createAppContainer(RootStack);

export default TheNav;
    



    
        
  