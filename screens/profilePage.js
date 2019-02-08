import React, {Component} from 'react';
import {Platform, StyleSheet,Button,TextInput,TouchableOpacity,Image, Text, View} from 'react-native';

import { observable, action } from "mobx";
import { observer } from "mobx-react/native";
import  GlobalStore  from '../components/globalStore';
import Icon from 'react-native-vector-icons/Ionicons';

@observer class ProfilePage extends Component{
    static navigationOptions = {
        header: null
      };

  constructor(props){
      super(props);

  }
  renderTopBar(){
    return(
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'green'}}>
          <View style={{flex: 3}} />{/*Top Bar Left Empty*/}
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image resizeMode="cover" style={{height: 90, width: 90}} source={require ('../assets/images/inekbuyuk.png')}/>
          </View>
          <View style={{flex: 3,justifyContent: 'center',alignItems: 'center',flexDirection: 'row',marginRight: 10}}>
            {/*Top Bar Right With Sepet*/}
            <View style={{flex: 6}} />{/*Empty Right Space*/}
            
              <View style={{flex: 2,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity >
                  <Icon name="md-basket" size={30} color="white" />
                    
                </TouchableOpacity>
            </View>

            
            
            
            

          </View>
        </View>
    )
  }
  render () {
    return(
        <View style={{flex:1,backgroundColor:'#768998'}}>
        {this.renderTopBar()}
             <Text>ProfilePage</Text>
             <TouchableOpacity></TouchableOpacity>
        </View>
    );
        
    
  }
}

export default ProfilePage;