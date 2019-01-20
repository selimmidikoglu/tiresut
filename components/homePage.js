import React, {Component} from 'react';
import {Platform, Image,StyleSheet, Dimensions, Text, ScrollView, View,ActivityIndicator} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TabNavigator } from "react-navigation";
import  GlobalStore  from './globalStore';
import Icon from 'react-native-vector-icons/Ionicons';
var dimensions ={
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

export default class HomePage extends Component{
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      products : [],
      latitude: GlobalStore.latitude,
      longitude: GlobalStore.longitute,
      error:null,
      loading: true,
    };
  }
  componentDidMount(){
    fetch('http://192.168.1.45:3000/products')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({products:responseJson})
      console.log(this.state.products);
      this.setState({loading:false})
    })
    .catch((error) => {
      console.error(error);
    });
    Geocoder.init('AIzaSyCyG67U79Ez16ov4XcDofAociXdDxIsOL8'); // use a valid API key
    Geocoder.from("Erzene Mahallesi")
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log("Lokasyon adından" + json.results);
        })
        .catch(error => console.warn(error));
 
    Geocoder.from(38.46549058,27.22578868)
        .then(json => {
        	var addressComponent = json//s[0].address_components[0];
          console.log(addressComponent);
        })
        .catch(error => console.warn(error));
       
  }
 
  renderMapView(){
    if(this.state.loading)
    {
      return <ActivityIndicator size="large" color="yellow" />;
    }else{
      return (
        <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map1}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09
        }}
        showUserLocation
        >
         {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}
        </MapView>
      </View>
      );
    }
  }
  renderProductsView(){
    let productsView = [];
      productsView = this.state.products.map((product) => (
      <View key={product.name} style={{height:dimensions.width/2, width:'50%'}}>
          <View style={{flex:1,borderRadius:25,alignItems:'center',justifyContent:'center',overflow: 'hidden'}}>
            <Image style= {{height: dimensions.width/2-10,width:dimensions.width/2-10}} resizeMode="cover" source = {{uri:product.imageUrl}}></Image>
          </View>
        </View>
        ))
      return productsView;
  }
 

  render() {
    return(
      <View style= {{flex:1,height: '100%',width:'100%',backgroundColor: 'rgba(0,0,0,0)'}}>
        <View style={{flex:1,flexDirection:'row',backgroundColor:'green'}}>
          <View style={{flex:3}}/>{/*Top Bar Left Empty*/} 
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image  resizeMode="cover" style={{height:50,width:200}} source={require('../assets/images/inekbuyuk.png')}></Image>
          </View>
          <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row', marginRight:10}}>{/*Top Bar Right With Sepet*/}
          <View style={{flex:5}}></View>{/*Empty Right Space*/}
          <View style={{flex:1,marginLeft:10,height:15,width:15,borderBottomColor:'white',borderBottomWidth:0.9, borderRadius:10, alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:9,color:'white'}}>+1</Text></View>
          <View style={{flex:2}}><Icon name="md-basket" size={30} color="white" /></View>
          
          </View>
        </View>
        <View style= {{flex:5}}>{/*Map View*/}
          {this.renderMapView()}
        </View>
        <View style={{flex:5,backgroundColor:'red',alignItems:'flex-start'}}>
        <ScrollView contentContainerStyle={{borderWidth:2,borderColor:'green',flexWrap:'wrap'}}>
        
          
          {this.renderProductsView()}
       
       
            
          
         
        
        </ScrollView> 
        </View>
        <View style={{flex:1,flexDirection:'row',backgroundColor:'green'}}></View>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map1: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
 }); 