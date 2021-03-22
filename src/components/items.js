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
export default function Item({values, count, addPress, decPress}) {

  return(
    <Animatable.View  animation="fadeInRight"
                      delay={400+100*values.id}
                      duration = {600}
                      useNativeDriver={true}
                      style={{...styles.item,backgroundColor: count==0?"#dff1f6":values.subType==3?"#f2f2f2":"#ffe3eb"}}>
      <View style={styles.itemButtonContainer}>
        <ButtonRight style={styles.buttonUp} onPress={()=>{if(addPress) addPress(values.id);}}/>
        <View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count.toString()}</Text>

        </View>
          {values.type==2?<Text style={styles.minText}>دقیقه</Text>:<></>}
        </View>
        <ButtonLeft style={styles.buttonUp} onPress={()=>{if(decPress) decPress(values.id);}}/>
      </View>

      <View style={styles.itemTextContainer}>
        <Text style={styles.textItemMain}>{values.name}</Text>
        <Text style={styles.textItemDescribe}>{values.subName}</Text>
      </View>

      <Image source={values.icon} style={{...styles.itemImageContainer,backgroundColor: COLORS[values.id%5]}}/>

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
    height: '20@s',
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
    fontSize: '8@s',
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
    width: "95@s",
    marginLeft: "10@s",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  countContainer:{
    height: '25@s',
    marginTop: 5,
    width: '35@s',
    borderWidth: 1,
    borderRadius: '5@s' ,
    borderColor: "#cfedf3",
    backgroundColor : '#f1f1f1',
    justifyContent: 'center',
    marginBottom: '5@s'
  },
  countText: {
    fontFamily: "Yekan",
    fontSize: '13@s',
    textAlign:'center',
    color: "#2b728c",
  },
  minText: {
    alignSelf: 'center',
    marginTop: '-8@s',
    fontFamily: "Yekan",
    fontSize: '10@s',
    textAlign:'center',
    color: "#2b728c",
  },
  buttonUp:{
    height: '30@s',
    width: '30@s',
    margin: '4@s'
  },
});
