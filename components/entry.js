import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, TextInput, Button, TouchableOpacity, Text, View} from 'react-native';
import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from './globalStore';
import HomePage from './homePage';
import { createStackNavigator, createAppContainer } from "react-navigation";

@observer class Entry extends Component{
  constructor(props){
      super(props)
      this.state = {
        name:'',
        phone_number: '',
        password: '',
        entryText:'Hikmet',
        goToFirstPage: false
      }
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            GlobalStore.changeCoordinates(position.coords.latitude,position.coords.longitude);
            error: null;
          
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
      );
      console.log("yeni koordinatlar" + GlobalStore.latitude + " " + GlobalStore.longitute)
  }

  changeName(text){
      //console.log("Previous name" +this.state.name);
      this.setState({name:text});
      //console.log("Later name" +this.state.name);
  }
  changeNumber(text){
      console.log("Previous number" +this.state.phone_number);
      this.setState({phone_number:text});
      //console.log("Later number" +this.state.phone_number);
  }
  changePassword(text){
      //console.log("Previous password" + this.state.password);
      this.setState({password:text});
      //console.log("Later password" + this.state.password);
  }
  login(){
    let userInfo = {};
    userInfo.phone_number = this.state.phone_number;
    console.log(this.state.phone_number)
    userInfo.password = this.state.password;
    console.log(userInfo)
    if( this.state.phone_number != '' && this.state.password != '')
    {
        console.log("fetche girdi")
          fetch('http://192.168.1.241:3000/customers/login', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        }).then(result => console.log(result ))
        .catch(err => console.log(err));
    }
    else{
        console.log("bir boka girmedi")
      Alert.alert(
          'Dikkat!',
          'Gerekli Yerleri Doldurun',
          [
            {text: 'İptal Et', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Tamam', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
    }
  }
  signUp(){
      let userInfo = {};
      userInfo.name = this.state.name;
      userInfo.phone_number = this.state.phone_number;
      userInfo.password = this.state.password;
      //console.log(userInfo);
      console.log('Girdi')
      if(this.state.name != '' && this.state.phone_number != '' && this.state.password != '')
      {
          console.log("fetche girdi")
            fetch('http://192.168.1.241:3000/customers/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
          }).then(result => console.log(result))
          .catch(err => console.log(err));
      }
      else{
          console.log("bir boka girmedi")
        Alert.alert(
            'Dikkat!',
            'Gerekli Yerleri Doldurun',
            [
              {text: 'İptal Et', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Tamam', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
      }
  }
  changePage(){
      this.setState({goToFirstPage:true})
  }
  render() {
      if(!this.state.goToFirstPage){
          return(
            <View style={styles.container}>
            <View style={{flex:1,backgroundColor:'#9c27b0',alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:100,height:50}}>
                        <Text>İsim:</Text>
                    </View>
                    <View style={{width:100,height:50,borderWidth:2,borderColor:'red'}}>
                        <TextInput onChangeText={(text) => this.changeName(text)}></TextInput>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:100,height:50}}>
                        <Text>Telefon Numarası:</Text>
                    </View>
                    <View style={{width:100,height:50,borderWidth:2,borderColor:'red'}}>
                        <TextInput onChangeText={(text) => this.changeNumber(text)}></TextInput>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:100,height:50}}>
                        <Text>Şifre:</Text>
                    </View>
                    <View style={{width:100,height:50,borderWidth:2,borderColor:'red'}}>
                        <TextInput secureTextEntry={true} onChangeText={(text) => this.changePassword(text)}></TextInput>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:100,height:50,backgroundColor:'red'}}>
                        <TouchableOpacity onPress={() => this.signUp()} >
                        <View style={{width:400,height:100}}></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:'cyan',alignItems:'center',justifyContent:'center'}}>
                <View style={{height: 50,borderColor: 'black', borderBottomWidth: 2,width:200, backgroundColor:'yellow'}}>
                    <TextInput placeholder = "Telefon Numarası" onChangeText = {(text) => this.changeNumber(text)}></TextInput>
                </View>
                <View style={{height: 50,width:200, backgroundColor:'yellow'}}>
                    <TextInput placeholder = "Şifre" onChangeText = {(text) => this.changePassword(text)}></TextInput>
                </View>
                
                <Button onPress = {() => this.props.navigation.navigate('HomePage')} title="Giriş Yap"></Button>
            </View>
          </View>
      
          )
      }else{
        return <FirstPage/>
      }
   
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    }, 
})


export default Entry;