import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
      latitude: null,
      longitude: null,
      error:null,
    };
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
    Geocoder.init('AIzaSyCyG67U79Ez16ov4XcDofAociXdDxIsOL8'); // use a valid API key
    Geocoder.from("Colosseum")
        .then(json => {
            var location = json.results//[0].geometry.location;
            //console.log(location);
        })
        .catch(error => console.warn(error));
 
    Geocoder.from(38.4653,27.2267)
        .then(json => {
        	var addressComponent = json.results//s[0].address_components[0];
          console.log(addressComponent);
        })
        .catch(error => console.warn(error));
  }
  
  render() {
    return (
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 38.4237,
          longitude: 27.1428,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
    );
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 }); 