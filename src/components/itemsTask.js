import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useDispatch } from 'react-redux';

import { scale, ScaledSheet } from 'react-native-size-matters';

import ButtonLeft from '../components/buttonLeft.js';
import ButtonRight from '../components/buttonRight.js';

const COLORS = ['#a7f1d4','#f5a9c7','#f8dc8f','#65dfea','#fe7ea3'];
export default function Item({index, count, type, title, name, sign, tick, icon}) {
  return(
    <Animatable.View  animation="fadeInRight"
                      delay={300+100*index}
                      duration = {500}
                      useNativeDriver={true}
                      style={{...styles.item,backgroundColor: "#dff1f6"}}>
      <Image  transition={false}
                        resizeMode= 'stretch'
                        style={styles.tick}
                        source={tick==true? require('../../assets/images/greenTick.png'):require('../../assets/images/greyTick.png')}/>
      <View style={styles.itemButtonContainer}>
        <ImageBackground  transition={false}
                          resizeMode= 'stretch'
                          style={styles.sign}
                          source={sign==0? require('../../assets/images/Increase_signhdpi.png'):require('../../assets/images/Decrease_signhdpi.png')}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count.toString()}</Text>
          </View>

        </ImageBackground>
        {type==2?<Text style={styles.minText}>دقیقه</Text>:<></>}
      </View>

      <View style={styles.itemTextContainer}>
        <Text style={styles.textItemMain}>{title}</Text>
        <Text style={styles.textItemDescribe}>{name}</Text>
      </View>

      <Image source={icon} style={styles.itemImageContainer}/>

    </Animatable.View>
  );
}

const styles = ScaledSheet.create({
  item:{
    width: "260@s",
    height: "40@s",
    backgroundColor: "#dff1f6",
    borderRadius: "10@s",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'flex-end' ,
    marginBottom: '3@s'
  },
  itemImageContainer:{
    height: "30@s",
    width: "30@s",
    borderRadius: "10@s",
    marginRight: "5@s",
    backgroundColor: "#a7f1d4",
  },
  itemTextContainer:{
    height: "40@s",
    width: "115@s",
    marginRight: "5@s",
  },
  textItemMain: {
    color: "#fe82a4",
    fontSize: '12@s',
    height: '18@s',
    fontWeight: "bold",
    fontFamily: "Yekan",
    textAlign: "right",
    marginRight: "3@s",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textItemDescribe: {
    color: "#2b728c",
    fontSize: '9@s',
    height: '18@s',
    // fontWeight: "bold",
    fontFamily: "Yekan",
    textAlign: "right",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  itemButtonContainer:{
    height: "40@s",
    width: "50@s",
    marginLeft: "10@s",
    alignItems: 'center',
    justifyContent: 'center',
  },
  countContainer:{
    height: '30@s',
    width: '30@s',
    justifyContent: 'center',
  },
  sign: {
    marginTop:'5@s',
    height: '30@s',
    width: '30@s',
  },
  tick: {
    marginTop:'0@s',
    height: '25@s',
    width: '25@s',
  },
  countText: {
    fontFamily: "Yekan",
    fontSize: '13@s',
    textAlign:'center',
    color: "#fff",
    marginTop: '-2@s'
  },
  minText: {
    alignSelf: 'center',
    marginTop: '-5@s',
    fontFamily: "Yekan",
    fontSize: '9@s',
    textAlign:'center',
    color: "#2b728c",
  },

});
