import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default function ButtonUp(props) {
    const [isPressed, setPressButton] = useState(false);
    return(
        <TouchableWithoutFeedback
          onPressIn={()=>setPressButton(true)}
          onPressOut={()=>setPressButton(false)}
          onPress={()=>{if(props.onPress)props.onPress();}}>
          <View style={{...props.style,justifyContent: 'center',alignItems: 'center'}}>

                           <ImageBackground resizeMode= 'stretch' style={{height: isPressed?"95%":"100%", width: isPressed?"95%":"100%",resizeMode: "stretch",justifyContent:'center'}} source={require('../../assets/images/Min_Bluehdpi.png')}>
                           </ImageBackground>

          </View>
        </TouchableWithoutFeedback>
    );
}

const styles = ScaledSheet.create({
  textHeader: {
    color: "white",
    marginBottom: '8@s',
    fontSize: '24@s',
    fontFamily: "Yekan",
    textAlign: "center",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});
