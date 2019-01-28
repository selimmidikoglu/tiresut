import React, {Component} from 'react';
import {Platform, Dimensions, StyleSheet,Keyboard,AsyncStorage, Alert, TextInput,Image, Button,TouchableWithoutFeedback, TouchableOpacity, Text, View} from 'react-native';
import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from './globalStore';
import HomePage from './homePage';
import BottomNavigation from '../screens/bottomNavigation';
import SecondPage from './secondPage';
import { createStackNavigator, createAppContainer } from "react-navigation";
var DismissKeyboard = require('dismissKeyboard'); 
var dimensions = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

@observer class Entry extends Component{
  constructor(props){
      super(props)
      this.state = {
        name:'',
        phone_number: '',
        infoTextColor: ['#040B10','#040B10','#040B10'],
        textInputLineColors: ['black','black','black'],
        signUpOrLogin : 'login'
      }
      
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount(){
    _retrieveData = async () => {
        try {
          const phone_number = await AsyncStorage.getItem('phone_number');
          if (phone_number !== null) {
            
            console.log(phone_number);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            GlobalStore.changeCoordinates(position.coords.latitude,position.coords.longitude);
            error: null;
          
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
      );
    
  }

  changeName(text){
      this.setState({name:text});
      
  }
  changeNumber(text){
      this.setState({phone_number:text});
  }
  changePassword(text){
      this.setState({password:text});
  }
  login(){
    let userInfo = {};
    userInfo.phone_number = this.state.phone_number;
    userInfo.password = this.state.password;
    if(this.state.phone_number.length<7 || this.state.phone_number>11)
    {
        Alert.alert(
            'Dikkat!',
            'Doğru Bir Telefon Numarası Girin',
            [
              {text: 'İptal Et', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Tamam', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }
    if( this.state.phone_number != '' && this.state.password != '')
    {
        console.log("fetche girdi")
          fetch('http://192.168.1.45:3000/customers/login', {
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
      if(this.state.phone_number.length != 11)
      {
          console.log("Telefon Numarasının uzunlugu" + this.state.phone_number.length);
        Alert.alert(
            'Dikkat!',
            'Doğru Bir Telefon Numarası Girin',
            [
              {text: 'İptal Et', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Tamam', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        return;
      }
      
      if(this.state.name != '' && this.state.phone_number != '' && this.state.password != '')
      {
          console.log("fetche girdi")
            fetch('http://192.168.1.45:3000/customers/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
          }).then(result => {
              if(result.status == 201){
                this.props.navigation.navigate('BottomNavigation')
              }
              else if(result.status == 409){
                Alert.alert(
                    'Dikkat!',
                    'Kullanıcı mevcut!',
                    [
                      {text: 'Tamam', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
              }
          })
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
  keyboardDismissAndChangeInputFieldLinesColor(){
        Keyboard.dismiss();
        this.setState({infoTextColor:['#040B10','#040B10','#040B10'], textInputLineColors:['black','black','black']});
  }
  changeLineColor(index){
      if(index == 0)
        this.setState({infoTextColor:['red','#040B10','#040B10'], textInputLineColors:['red','black','black']});
      else if(index == 1)
        this.setState({infoTextColor:['#040B10','red','#040B10'],textInputLineColors:['black','red','black']});
      else
      this.setState({infoTextColor:['#040B10','#040B10','red'],textInputLineColors:['black','black','red']});
  }
  
  renderSignup(){
      if(this.state.signUpOrLogin == 'signUp'){
        return(
            <View style={{flex:1}}>
                <View style = {{flex:3,alignItems:'center',justifyContent:'center'}}>
                    <Image style ={{height:200,width:200}}source={require('../assets/images/inek.png')}></Image>
                    <View style={{width:dimensions.width-50}}>
                        <Text style={{color:'#6B4401',fontFamily:'Courgette-Regular',fontSize:15,textAlign:'center',textAlignVertical:'top'}}>Tiresüt'ün doğallığı, yeşil lezzeti bir tıklamayla evinize geliyor. 
                            Tamamen doğal, kimyasal süreç görmemiş süt, dondurma, yoğurt, peynir ve bir çok ürün için artık günlük teminat bir app kadar uzağınızda.
                        </Text>
                    </View>
                </View>
                <View style = {{flex:5,alignItems:'center',justifyContent:'center'}}>
                    <View style ={{alignItems:'center',justifyContent:'center',height: dimensions.height*1/4,width: dimensions.width*3/4,backgroundColor:'white',borderRadius: 16}}>
                        <View style={[styles.lineOfInput,{borderBottomColor:this.state.textInputLineColors[0]}]}>
                            <View style={styles.infoInput}>
                                <Text style={{color:this.state.infoTextColor[0],fontFamily:'Courgette-Regular',fontSize:15}}>İsim:</Text>
                            </View>
                            <View style={styles.infoText}>
                                <TextInput style={styles.textInputStyle} selectionColor={'red'} autoCorrect={false}  underlineColorAndroid='rgba(0,0,0,0)' 
                                    onFocus={() => this.changeLineColor(0)}  onChangeText={(text) => this.changeName(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={[styles.lineOfInput,{borderBottomColor:this.state.textInputLineColors[1]}]}>
                            <View style={styles.infoInput}>
                                <Text style={{color:this.state.infoTextColor[1],fontFamily:'Courgette-Regular',fontSize:15}}>Tel. No:</Text>
                            </View>
                            <View style={styles.infoText}>
                                <TextInput keyboardType={'phone-pad'} style={styles.textInputStyle} selectionColor={'red'} autoCorrect={false}  
                                    underlineColorAndroid='rgba(0,0,0,0)' onFocus={() => this.changeLineColor(1)}  onChangeText={(text) => this.changeNumber(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={[styles.lineOfInput,{borderBottomColor:this.state.textInputLineColors[2]}]}>
                            <View style={styles.infoInput}>
                                <Text style={{color:this.state.infoTextColor[2],fontFamily:'Courgette-Regular',fontSize:15}}>Şifre:</Text>
                            </View>
                            <View style={styles.infoText}>
                                <TextInput style={styles.textInputStyle} secureTextEntry={true} selectionColor={'red'} autoCorrect={false}  underlineColorAndroid='rgba(0,0,0,0)' 
                                    onFocus={() => this.changeLineColor(2)}  onChangeText={(text) => this.changePassword(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{flex:1,width: dimensions.width*3/4-100,alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.signUp()}><Text style={{color:'red',fontFamily:'FontAwesome5_Solid',fontSize:15}}>Kayıt Ol</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'100%',marginBottom:0,height:13,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.setState({signUpOrLogin:'login'})}>
                            <Text style={{color:'blue',fontSize:12,textDecorationLine:'underline'}}>Girişe geri dön!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
      }
      else{
          return (
            <View style={{flex:1}}>
                <View style = {{flex:3,alignItems:'center',justifyContent:'center'}}>
                    <Image style ={{height:200,width:200}}source={require('../assets/images/inek.png')}></Image>
                    <View style={{width:dimensions.width-50}}>
                        <Text style={{color:'#6B0101',fontFamily:'Courgette-Regular',fontSize:15,textAlign:'center',textAlignVertical:'top'}}>Tiresüt'ün doğallığı, yeşil lezzeti bir tıklamayla evinize geliyor. 
                            Tamamen doğal, kimyasal süreç görmemiş süt, dondurma, yoğurt, peynir ve bir çok ürün için artık günlük teminat bir app kadar uzağınızda.
                        </Text>
                    </View>
                </View>
                <View style = {{flex:5,alignItems:'center',justifyContent:'center'}}>
                    <View style ={{alignItems:'center',justifyContent:'center',height: dimensions.height*1/4,width: dimensions.width*3/4,backgroundColor:'white',borderRadius: 16}}>
                        <View style={[styles.lineOfInput,{borderBottomColor:this.state.textInputLineColors[0]}]}>
                            <View style={styles.infoInput}>
                                <Text style={{color:this.state.infoTextColor[0],fontFamily:'Courgette-Regular',fontSize:15}}>Tel. No:</Text>
                            </View>
                            <View style={styles.infoText}>
                                <TextInput style={styles.textInputStyle} keyboardType={'phone-pad'}  selectionColor={'red'} autoCorrect={false}  
                                    underlineColorAndroid='rgba(0,0,0,0)' onFocus={() => this.changeLineColor(0)} onChangeText = {(text) => this.changeNumber(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={[styles.lineOfInput,{borderBottomColor:this.state.textInputLineColors[1]}]}>
                            <View style={styles.infoInput}>
                                <Text style={{color:this.state.infoTextColor[1],fontFamily:'Courgette-Regular',fontSize:15}}>Şifre:</Text>
                            </View>
                            <View style={styles.infoText}>
                                <TextInput secureTextEntry={true} style={styles.textInputStyle} selectionColor={'red'} autoCorrect={false} 
                                    underlineColorAndroid='rgba(0,0,0,0)' onFocus={() => this.changeLineColor(1)} onChangeText = {(text) => this.changePassword(text)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{flex:1,width: dimensions.width*3/4-100,alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.login()}><Text style={{color:'red',fontFamily:'FontAwesome5_Solid',fontSize:15}}>Giriş Yap</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'100%',marginBottom:0,height:13,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.setState({signUpOrLogin:'signUp'})}>
                            <Text style={{color:'blue',fontSize:12,textDecorationLine:'underline'}}>Hesap Oluştur!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </View>
          )
      }
  } 
  render() {
     
          return(
            <View style ={styles.container}>
                <TouchableWithoutFeedback onPress={ () => this.keyboardDismissAndChangeInputFieldLinesColor()}>
                    {this.renderSignup()}
                </TouchableWithoutFeedback>
                
                
            </View>
          )
    
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        width: '100%',
        backgroundColor: '#39EF3F'
    },
    imageView:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    }, 
    inputBox: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    lineOfInput: {
        flex:1,
        width: dimensions.width*3/4-20,
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    infoInput: {
        flex:2,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    infoText: {
        flex:5,
        alignItems:'flex-start',
        justifyContent:'flex-end',
        
    },
    textInputStyle :{
        //height:dimensions.height*1/16,
        width:dimensions.width*15/28,
        paddingBottom:0,
        fontFamily:'Courgette-Regular',
        fontSize:15
    }
})


export default Entry;