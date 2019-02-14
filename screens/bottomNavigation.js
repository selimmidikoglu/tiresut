import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer,createBottomTabNavigator } from "react-navigation";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import HomePageContainer from '../routes/homePageContainer';
import OrdersPage from './ordersPage';
import ProfilePage from './profilePage';
import AdressesPage from './adressesPage';

//dimensions

import design from '../constants/dimensions';
const RootStack = createMaterialBottomTabNavigator({
    
    HomePageContainer: {
        screen: HomePageContainer,
        navigationOptions:{
            tabBarLabel:'Ürünler',
            tabBarIcon:({tintColor}) => (
            <Icon name="ios-home" size={27} color="white"/>
            )
        }
    },
    OrdersPage: {screen: OrdersPage,
        navigationOptions:{
            tabBarLabel:'Siparişler',
            tabBarIcon:({tintColor}) => (
            <Icon name="md-reorder" size={27} color="white"/>
            )
        }
    },
    ProfilePage: {screen: ProfilePage,
        navigationOptions:{
            tabBarLabel:'Profil',
            tabBarIcon:({tintColor}) => (
            <Icon name="ios-person" size={27} color="white"/>
            )
        }
    },
    AdressesPage: {screen: AdressesPage,
        navigationOptions:{
            tabBarLabel:'Adresler',
            tabBarIcon:({tintColor}) => (
            <Icon name="ios-pin" size={27} color="white"/>
            )
        }
    }
},
{
    initialRouteName: 'HomePageContainer',
    order:['HomePageContainer','AdressesPage','OrdersPage','ProfilePage'],
    activeColor: '#e65100',
    activeTintColor: '#e65100',
    inactiveColor: 'white',
    barStyle: {backgroundColor: '#4b2c20',height: design.navBarHeight},
  }
)
 
const BottomNavigation = createAppContainer(RootStack);

export default BottomNavigation;
    



    
        
  