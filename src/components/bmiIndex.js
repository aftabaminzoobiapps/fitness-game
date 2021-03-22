import React, {useState} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { scale,ScaledSheet } from 'react-native-size-matters';

export default function bmiIndex({range,bmi}) {
  function showBMI()
  {
      return(
              <ImageBackground   resizeMode= 'stretch'
                                 style={styles.bmiValueContainer}
                                 source={require('../../assets/images/bmiValue.png')}>
                                 <Text style={styles.textBMIValues}>{bmi.toFixed(1)}</Text>
              </ImageBackground>
            );
  }

  return(
    <ImageBackground  resizeMode= 'stretch'
                      style={styles.bmiRange}
                      source={require('../../assets/images/bmiRange.png')}>
                      <View style={styles.bmiPartsContainer}>
                        <View style={styles.bmiParts}>
                          <Text style={styles.textValues}>چاق</Text>
                          {range==4?showBMI():<></>}
                        </View>
                        <View style={styles.bmiParts}>
                          <Text style={{...styles.textValues,fontSize: scale(9), marginTop: scale(2)}}>اضافه وزن</Text>
                          {range==3?showBMI():<></>}
                        </View>
                        <View style={styles.bmiParts}>
                          <Text style={styles.textValues}>طبیعی</Text>
                          {range==2?showBMI():<></>}
                        </View>
                        <View style={styles.bmiParts}>
                          <Text style={styles.textValues}>لاغر</Text>
                          {range==1?showBMI():<></>}
                        </View>
                        <View style={styles.bmiParts}>
                          <Text style={{...styles.textValues,fontSize: scale(9),marginTop: scale(5), marginRight: scale(5)}}>کمبود وزن</Text>
                          {range==0?showBMI():<></>}
                        </View>
                      </View>
                      <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                        <Text style={styles.textTitle}>شاخص</Text>
                        <Text style={{...styles.textTitle,marginTop: scale(3)}}>BMI </Text>
                      </View>
    </ImageBackground>
  );
}

const styles = ScaledSheet.create({
  bmiRange:{
    height: '45@s',
    width: '250@s'
  },
  bmiValueContainer:{
    height: '40@s',
    width: '45@s',
    position: 'absolute',
    top: '-35@s'
  },
  bmiPartsContainer:{
    width: "100%",
    height: '45@s',
    flexDirection: 'row',
  },
  bmiParts:{
    flex:1,
    alignItems: 'center',
  },
  textValues: {
    color: "white",
    marginBottom: '8@s',
    fontSize: '12@s',
    fontFamily: "Yekan",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textBMIValues: {
    color: "white",
    marginBottom: '8@s',
    fontSize: '15@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  textTitle: {
    color: "#0f3648",
    marginBottom: '8@s',
    fontSize: '12@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
});
