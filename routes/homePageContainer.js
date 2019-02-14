import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Basket from '../screens/basket';
import HomePage from '../screens/homePage';
import AddOrChooseAdress from '../screens/addOrChooseAdress';
import { createAppContainer,createStackNavigator } from "react-navigation";

const HomePageContainer = createStackNavigator({
    HomePage:{
        screen: HomePage,
    },
    Basket:{
        screen: Basket,
       
    },
    AddOrChooseAdress:{
        screen: AddOrChooseAdress
    }
    
},{ 
    headerMode :'none',
    navigationOptions: () => ({
            
        headerVisible: false,
      }),
});

export default HomePageContainer;