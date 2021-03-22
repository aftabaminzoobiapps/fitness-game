import React, {useState,useEffect} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { scale,ScaledSheet } from 'react-native-size-matters';
import { useToast } from 'react-native-styled-toast';

const Bars=[
  require('../../assets/images/bar_0.png'),
  require('../../assets/images/bar_25.png'),
  require('../../assets/images/bar_75.png'),
  require('../../assets/images/bar_100.png')
];

const COLORS=[
              ["#EEF2FA","#2E5AAC","#89A7E0"],
              ["#FEEFEF","#DA1414","#f48989"],
              ["#FFF4EC","#B95000","#FF8F39"],
              ["#EDF9F0","#28FD3C","#5ACA75"]
             ]
export default function BarColor({level,info,tip,icon}) {
  const { toast } = useToast();

  function showTip()
  {
    // console.log("Toast");
    toast({
            message: tip,
            messageFontSize: scale(15),
            messageFontFamily: "Yekan",
            toastStyles: {
              bg: COLORS[level][0],
              borderRadius: 10,
              borderColor: COLORS[level][2],
              borderWidth: 2,
            },
            color: COLORS[level][1],
            iconColor: COLORS[level][1],
            iconFamily: 'Ionicons',
            //iconName: 'restaurant',
            // iconName: 'ios-bicycle',
            iconName: icon,
            iconSize: scale(24),
            closeIconFamily: 'Ionicons',
            closeIconName: 'close',
            closeButtonStyles: {
              px: 4,
              bg: COLORS[level][1],
              borderRadius: 10
            },
            closeIconColor: 'white',
            hideAccent: true,
          });
  }

  useEffect(() => {
    if(tip!="")setTimeout(()=>showTip(),info*1000);
  }, [tip]);

  return(
    <View style={styles.barContain}>
      <ImageBackground  style={{height: "100%", width: "100%"}}
                        resizeMode={'cover'}
                        source={Bars[level]}>
      </ImageBackground>
      {tip!=""?<TouchableWithoutFeedback  onPress={()=>{showTip();}}>
        {info==0?<Image source={require('../../assets/images/info.png')} style={styles.infoIconRight}/>:<Image source={require('../../assets/images/info.png')} style={styles.infoIcon}/>}
      </TouchableWithoutFeedback>:<></>}
    </View>
  )
}


const styles = ScaledSheet.create({
  barContain:{
    height: '16@s',
    width: "90@s",
    position: 'absolute',
    bottom: '60@s',
    alignSelf: 'center'
  },
  infoIcon:{
    position: "absolute",
    bottom: '-50@s',
    left: '-7@s',
    width: "35@s",
    height: "35@s",
  },
  infoIconRight:{
    position: "absolute",
    bottom: '-50@s',
    right: '-7@s',
    width: "35@s",
    height: "35@s",
  }
});
