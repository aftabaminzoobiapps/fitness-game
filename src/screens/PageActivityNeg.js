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

import { useDispatch, useSelector } from 'react-redux';

import { scale, ScaledSheet } from 'react-native-size-matters';
import Item from '../components/items.js';
import {Activity3} from '../data/activity.js';
import { dataActivity3 } from '../actions/data/data_actions.js';

export default function PageActivityNeg({ navigation }) {
  const active3 = useSelector(({data}) => data.active3);
  const dispatch = useDispatch();

  function addActivity(id){
    let activityValue=active3[id]+10;
    if(activityValue<999)
    {
      // food1[id] = foodValue;
      dispatch(dataActivity3(activityValue,id))
    }

  }

  function decActivity(id){
    let activityValue=active3[id]-10;
    if(activityValue>-1)
    {
      // food1[id] = foodValue;
      dispatch(dataActivity3(activityValue,id))
    }

  }

  function activityList() {

      return Activity3.map((data) => {
        return (

          <Item key={data.id} values={data} count={active3[data.id]} addPress={addActivity} decPress={decActivity}/>
        )
      })
  }

  return(
    <>
      <ImageBackground
            transition={false}
            resizeMode= 'stretch'
            style={styles.container}
            source={require('../../assets/images/Rain_back.png')}>
            <TouchableWithoutFeedback
              onPress={()=>navigation.pop()}>
                <Animatable.Image animation="fadeInDown" delay={1500} useNativeDriver={true} resizeMode= 'stretch'
                                     style={styles.backButton}
                                     source={require('../../assets/images/Arrow.png')}/>
            </TouchableWithoutFeedback>
          <Animatable.View animation="fadeInDown" delay={500} useNativeDriver={true}>
            <ImageBackground
                  transition={false}
                  resizeMode= 'stretch'
                  style={styles.dialog}
                  source={require('../../assets/images/bad_activity.png')}>

                  <View style={styles.childrenContain}>

                    <View style={styles.headerContain}>
                      <Text style={styles.textHeader}>عادت های رفتاری غیر فعال</Text>
                    </View>
                    <View style={styles.itemContain}>
                      {activityList()}
                    </View>
                 </View>

            </ImageBackground>
          </Animatable.View>
      </ImageBackground>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    backgroundColor: "#0f3648"
  },
  dialog: {
    height: '325@s',
    width: '300@s',
    marginBottom: '80@s',
  },
  childrenContain:{
    height: "100%",
    width: "100%",
    marginTop: '20@s',
    alignItems: 'center',
  },
  headerContain:{
    marginTop: '50@s',
    width: "100%",
    height: "33@s",
    justifyContent:'flex-start'
  },
  textHeader: {
    color: "white",
    fontSize: '9@s',
    fontFamily: "Yekan",
    textAlign: "right",
    marginRight: '48@s',
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  itemContain:{
    marginTop:'8@s'
  },
  textScroll: {
    position: "absolute",
    bottom: scale(130),
    color: "#2b728c",
    fontSize: '18@s',
    fontFamily: "Yekan",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  backButton:{
    position: 'absolute',
    top: 20,
    left: 10,
    width: '90@s',
    height: '60@s',
  }
});
