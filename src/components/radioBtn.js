import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
} from 'react-native';

export default function RadioButton(props) {

    return(
      <TouchableWithoutFeedback onPress={()=>{if(props.onPress)props.onPress();}}>
        <View style={props.style}>

                       <ImageBackground resizeMode= 'stretch' style={{height: "100%", width: "100%",resizeMode: "stretch"}} source={require('../../assets/images/radiobtn.png')}>
                          {props.checked?<Image style={{height: "100%", width: "100%",resizeMode: "stretch"}} source={require('../../assets/images/radiobtncheck.png')}/>
                                          :<></>}
                       </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
}
