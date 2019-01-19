import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TabNavigator } from "react-navigation";
var coordinates=[{latitude:'38.4710',longitude:'27.2177'},{latitude:'38.5184',longitude:'27.1382'},{latitude:'40.9769',longitude:'29.0625'}]

export default class HomePage extends Component{
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: 38.41885,
      longitude: 27.12872,
      error:null,
      loading: true,
    };
  }
  componentDidMount(){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        var lat = toString(position.coords.latitude);
        console.log(lat);
        var lon = toString(position.coords.longitude);
        console.log(lon);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );
    Geocoder.init('AIzaSyCyG67U79Ez16ov4XcDofAociXdDxIsOL8'); // use a valid API key
    Geocoder.from("Erzene Mahallesi")
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log("Lokasyon adından" + json.results);
        })
        .catch(error => console.warn(error));
 
    Geocoder.from(38.46549058,27.22578868)
        .then(json => {
        	var addressComponent = json.results//s[0].address_components[0];
          console.log(addressComponent);
        })
        .catch(error => console.warn(error));
       setInterval(this.setState({loading:false}),5000);
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
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        showUserLocation
        >
         <MapView.Marker
              showUserLocation
              coordinate={{latitude: this.state.latitude,
              longitude: this.state.longitude}}
              title={"Konumunuz"}
              description={"Bulunduğunuz konum!"}
           />
        </MapView>
      </View>
      );
    }
  }
 
  render() {
    return(
      <View style= {{flex:1,alignItems:'center',justifyContent:'center',height: '100%',width:'100%',backgroundColor: 'black'}}>
        {this.renderMapView()}
      </View>
      
      )
    
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map1: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
 }); 