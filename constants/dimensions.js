import React, {Component} from 'react';
import {Dimensions} from 'react-native';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var design = {
    width: width,
    tabBarHeight : height * 1/14,
    mapViewHeight : height * 5/14,
    productViewHeight : height * 7 / 14,
    navBarHeight : height*1/14,
    basketHeight: height*12/14,
}

export default design;