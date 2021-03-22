import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { scale,ScaledSheet } from 'react-native-size-matters';

export default function PopUp(props) {

    return(
      <View style={{...props.style,marginTop:scale(100)}}>
        <Image resizeMode= 'stretch'
               source={require('../../assets/images/popuptop.png')}
               style={styles.imageTop}/>
          <ImageBackground resizeMode= 'stretch'
                          source={require('../../assets/images/popupmain.png')}
                          style={styles.imageContain}>
              <View style={styles.childrenContain}>
                <View style={styles.headerContain}>
                  <Text style={styles.textHeader}>{props.headerText}</Text>
                </View>
               {props.children}
             </View>
          </ImageBackground>

      </View>
    );
}

const styles = ScaledSheet.create({
  headerContain:{
    width: "100%",
    height: "100@s",
    justifyContent: 'center'
  },
  imageTop: {
    height: "100@s",
    width: "100%",
    marginBottom:"-0.1@s",
  },
  imageContain: {
    height: "100%",
    width: "100%",
    marginBottom:"100@s",
  },
  childrenContain:{
    height: "100%",
    width: "100%",
    marginTop:"-110@s",
  },
  textHeader: {
    color: "white",
    fontSize: '24@s',
    fontFamily: "Yekan",
    textAlign: "center",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});
