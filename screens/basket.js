import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput,Image, Text, View, TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavigation from './bottomNavigation';
import  GlobalStore  from '../components/globalStore';

//dimensions 
import design from '../constants/dimensions';
import { observable, action, toJS } from "mobx";
import { observer } from "mobx-react/native";

@observer class Basket extends Component{
        constructor(props){
            super(props);
            
        }
    renderProductCell(){
        let productCells = [];
        if(GlobalStore.clone.length == 0)
        {
            return <Text>Henüz hiç bir ürününüz bulunmamaktadır.</Text>
        }else{
            productCells = GlobalStore.clone.map( product =>
                (<View key ={product.name} style={{height:200,width:design.width-20,flexDirection:'row',borderRadius:25,borderColor:'white', borderWidth:3,marginTop:20}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                        <Image source={{uri:product.imageUrl}} style={{height:100,width:100,borderRadius:50}}/>
                        <Text  style={{color:'white',fontFamily:'Courgette-Regular', fontSize:15, textAlign:'center'}}>
                            {product.name}
                        </Text>
        
                     
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                        <Text  style={{color:'white',fontFamily:'Courgette-Regular', fontSize:15, textAlign:'center'}}>
                            {product.quantity} Adet
                        </Text>
                        <Text  style={{color:'white',fontFamily:'Courgette-Regular', fontSize:15, textAlign:'center'}}>
                            {product.finalPrice} Tl.
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                        <Button title='Kaldır' style={{backgroundColor:'red'}} onPress={()=>GlobalStore.removeProduct(product.name)}></Button>
                    </View>
                </View>
                ));
        }
        return productCells;
    }
    render(){
        return(
            <View style={{flex:1,height:design.basketHeight,width:design.width,alignItems:'center',justifyContent:'center', backgroundColor:'green'}}>
                    <ScrollView>
                    {this.renderProductCell()}
                    </ScrollView>
                    <View style={{height:100,width:design.width,backgroundColor:'orange'}}></View>
            </View>
        )
    }

}

export default Basket;