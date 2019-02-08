import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput,Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//components
import BottomNavigation from './bottomNavigation';
import Basket from './basket';

//dimensions 
import design from '../constants/dimensions';
//state management
import  GlobalStore  from '../components/globalStore';
import { observable, action } from "mobx";
import { observer } from "mobx-react/native";

@observer class TabBarEncapsulator extends Component{
    //render basket Number
    renderBasketNumber(){
        if(GlobalStore.counter == 0){
          return null;
        }
        else{
          return(
            <View style={{flex: 1,marginLeft: 10,height: 15,width: 15,backgroundColor:'red',
                            borderRadius: 7.5,alignItems: 'center',justifyContent: 'center',position:'absolute',top:5,right:15}}>
              <Text style={{fontSize: 9, color: 'white'}}>{GlobalStore.counter}</Text>
            </View>
          );
        }
      }
    renderTopBar(){
        return(
          <View style={{height:design.tabBarHeight, flexDirection: 'row', backgroundColor: 'green'}}>
              <View style={{flex: 3}} />{/*Top Bar Left Empty*/}
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image resizeMode="cover" style={{height: 90, width: 90}} source={require ('../assets/images/inekbuyuk.png')}/>
              </View>
              <View style={{flex: 3,justifyContent: 'center',alignItems: 'center',flexDirection: 'row',marginRight: 10}}>
                {/*Top Bar Right With Sepet*/}
                <View style={{flex: 6}} />{/*Empty Right Space*/}
                
                  <View style={{flex: 2,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress = {()=> GlobalStore.changeBetweenBasketOrBottomNav()}>
                      <Icon name="md-basket" size={30} color="white" />
                        {this.renderBasketNumber()}
                    </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }
    renderBasketOrBottomNavigation(){
        if(GlobalStore.basketOrBottomNav){
            return <Basket/>
        }
        else{
            return <BottomNavigation/>
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                {this.renderTopBar()}
                {this.renderBasketOrBottomNavigation()}
            </View>
        )
    }

}

export default TabBarEncapsulator;