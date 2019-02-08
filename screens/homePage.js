import React, {Component  } from 'react';
import {Platform, Image,StyleSheet, Dimensions,TextInput,Text, ScrollView,Button, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, View,ActivityIndicator} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TabNavigator } from "react-navigation";
import  GlobalStore  from '../components/globalStore';
import Icon from 'react-native-vector-icons/Ionicons';
//import { Icon } from 'react-native-elements'
import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import hostURL from '../hostURL';
var dimensions ={
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  scrollheight: 0
}

@observer class HomePage extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super (props);

    this.state = {
      products: [],
      latitude: GlobalStore.latitude,
      longitude: GlobalStore.longitute,
      error: null,
      loading: true,
      productWindow: false,
      basketWindow : false,
      product: [],
      productName:'',
      productId: '',
      productPrice: '',
      imageUrl: '',
    };
  }
  componentDidMount () {
    fetch (hostURL+'products')
      .then (response => response.json ())
      .then (responseJson => {
        this.setState ({products: responseJson});
        if(this.state.products.length%2 == 0){
            dimensions.scrollheight = this.state.products.length/2*dimensions.width/2 + 10
        }
        else{
            dimensions.scrollheight = ((this.state.products.length/2) + 1)* dimensions.width/2
        }
        this.setState ({loading: false});
      })
      .catch (error => {
        console.error (error);
      });
    Geocoder.init ('AIzaSyCyG67U79Ez16ov4XcDofAociXdDxIsOL8'); // use a valid API key
    Geocoder.from ('Erzene Mahallesi')
      .then (json => {
        var location = json.results[0].geometry.location;
        console.log ('Lokasyon adından' + json.results);
      })
      .catch (error => console.warn (error));

    Geocoder.from (38.46549058, 27.22578868)
      .then (json => {
        var addressComponent = json; //s[0].address_components[0];
        console.log (addressComponent);
      })
      .catch (error => console.warn (error));
  }
  //getBasketWindow()
  //Opens a single product window for to choose quantity of products than adds values to GlobalStore
  getProductForWindow(product){
    GlobalStore.productToAdd._id = product._id;
    GlobalStore.productToAdd.name = product.name;
    GlobalStore.productToAdd.imageUrl = product.imageUrl;
    GlobalStore.productToAdd.price = product.price;
    GlobalStore.productToAdd.finalPrice = product.price;
    
    this.setState({product:product});
    //console.log(this.state.product);
    this.setState({productWindow:true})
  }
  openProductWindow(){
    
   if(this.state.productWindow == false)
    return null;
   else{
    return(
      <View style={{height:'100%',width:'100%', backgroundColor:'green',alignItems:'center',alignSelf:'center'}}>
        <View style={{flex:4,alignItems:'center'}}>
          <View style={{flex:4}}>
            <Image style={{height:120,width:120,borderRadius:60,marginTop:10}} source={{uri:this.state.product.imageUrl}}/>
            <Text  style={{fontFamily:'Courgette-Regular',textAlign:'center',marginTop:5,color:'white'}}>{this.state.product.name}</Text>
          </View>
          <View style={{flex:2,width:120,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>GlobalStore.decrementQuantity()}>
                <View style={{width:50,height:50,alignItems:'center',justifyContent: 'center',}}><Icon name="md-remove" size={30} color='#F122A4'/></View>
                
              </TouchableOpacity>
            </View>
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}><Text style= {{color:'white',fontSize:20}}>{GlobalStore.productToAdd.quantity}</Text></View>  
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>GlobalStore.incrementQuantity()}>
                <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}><Icon name="md-add" size={30} color='#F122A4'/></View>
                
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style= {{color:'white',textAlign:'center',fontSize:20}}>{GlobalStore.productToAdd.finalPrice} TL.</Text>
          </View>
          
        </View>
        <View style={{flex:1,flexDirection:"row"}}>{/*Product Escape Buttons*/}
          <View style={{flex:3,flexDirection:'row',alignItems:'stretch',justifyContent:'flex-start'}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({productWindow:false})}>
              <View style={{flex:1, flexDirection:'row',alignItems:'stretch',justifyContent:'flex-start'}}>
                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                  <Icon name="md-arrow-round-back"  size={20} color="white" />
                </View>
                <View style={{flex:4,alignItems:'flex-start',justifyContent:'center'}}>
                  <Text style={{color:'white',fontSize:15}}>Ürünlere Dön</Text>
                </View>
              </View>
            </TouchableOpacity> 
          </View>
          <View style={{flex:4,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{
              GlobalStore.addProductToBasket(GlobalStore.productToAdd);
              console.log(GlobalStore.products[0]);
              this.setState({productWindow:false});
              
            }}>
              <Text style={{color:'#5A3C1A',fontSize:15}}>Sepete Ekle</Text>
              <Icon name="md-add-circle-outline" style= {{alignSelf:'center'}} size={20} color='#F12222'/>
            </TouchableOpacity>
            
          </View>
          <View style={{flex:3,flexDirection:'row',alignItems:'stretch',justifyContent:'flex-end'}}>
            <TouchableOpacity  style={{flex:1}} onPress={()=>GlobalStore.changeBetweenBasketOrBottomNav()}>
            <View style={{flex:3,flexDirection:'row',alignItems:'stretch',justifyContent:'flex-end'}}>
              <View style={{flex:4,alignItems:'flex-end',justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:15}}>Sepete Git</Text>
              </View>
              <View style={{flex:1,width: 10,alignItems:'flex-end',justifyContent:'center'}}>
               
                    <Icon name="md-arrow-round-forward"  size={20} color="white" />
                
              </View>
            </View>
            </TouchableOpacity> 
          </View>
          
        </View>
        
      </View>
    )
   } 

    

  }
  renderMapView () {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="yellow" />;
    } else {
      return (
        <View style={styles.container}>
          
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map1}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }}
            showUserLocation
          > 
            {!!this.state.latitude &&
              !!this.state.longitude &&
              <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                title={'Şu anki konumunuz'}
              />}
          </MapView>
        </View>
      );
    }
  }
  
  renderProductsView () {
    let productsView = [];
    productsView = this.state.products.map (product => (
      <View
        key={product.name}
        style={{height: dimensions.width/2,alignItems:'center',justifyContent:'center'}}
      >
        
          <View
            style={{
              flex: 5,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              //overflow: 'hidden',
            }}
          >
         
            <View style={{height: dimensions.width / 2 - 60,width: dimensions.width / 2 - 30,borderRadius:30}}>
              <TouchableOpacity onPress = {() => this.getProductForWindow(product)} >
                <Image
                  style={{
                    borderRadius:30,
                    height: dimensions.width / 2 - 60,
                    width: dimensions.width / 2 - 30,
                  }}
                  resizeMode="cover"
                  source={{uri: product.imageUrl}}
                />
              </TouchableOpacity>  
            </View>  
          
          </View>
          <View style={{flex:1,width:dimensions.width/2,justifyContent:'center',alignItems:'center'}}>
            <Text  style={{color:'white',fontFamily:'Courgette-Regular', fontSize:15, textAlign:'center'}}>
              {product.name}
            </Text>
            <Text  style={{color:'white', fontSize:10,fontWeight:'bold', textAlign:'center'}}>
              {product.price} TL.
            </Text>
          </View>
         
        
      </View>
    ));
    return productsView;
  }


  render () {
    return (
      
      <View style={{ flex: 1, height: '100%', width: '100%'}} >
        <View style={{flex: 3,alignItems:'center',justifyContent:'center'}}>{/*Map View*/}
          {this.renderMapView ()}
          
        </View>
        <View
          style={{flex: 5,backgroundColor:'green', alignItems: 'center',justifyContent:'center'}}
        > 
          {this.openProductWindow()}
          <ScrollView
            contentContainerStyle={{
              flexWrap: 'wrap',
              width:dimensions.width,
              height: dimensions.scrollheight,
              
            }}
          >
            {this.renderProductsView ()}

          </ScrollView>
          
        </View>
            
      </View>
      
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 300,
    width: dimensions.width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position:'absolute'
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
  },
});

export default HomePage;
