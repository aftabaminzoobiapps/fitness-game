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
import {Activity2} from '../data/activity.js';
import { dataActivity2 } from '../actions/data/data_actions.js';

export default function PageActivityHalf({ navigation }) {
  const active2 = useSelector(({data}) => data.active2);
  const dispatch = useDispatch();

  function addActivity(id){
    let activityValue=active2[id]+10;
    if(activityValue<999)
    {
      // food1[id] = foodValue;
      dispatch(dataActivity2(activityValue,id))
    }

  }

  function decActivity(id){
    let activityValue=active2[id]-10;
    if(activityValue>-1)
    {
      // food1[id] = foodValue;
      dispatch(dataActivity2(activityValue,id))
    }

  }

  function activityList() {

      return Activity2.map((data) => {
        return (

          <Item key={data.id} values={data} count={active2[data.id]} addPress={addActivity} decPress={decActivity}/>
        )
      })
  }

  return(
    <>
      <ImageBackground
            transition={false}
            resizeMode= 'stretch'
            style={styles.container}
            source={require('../../assets/images/Half_Activity_Backgroundhdpi.png')}>
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
                  source={require('../../assets/images/half_Activity.png')}>

                  <View style={styles.childrenContain}>

                    <View style={styles.headerContain}>
                      <Text style={styles.textHeader}>عادت های رفتاری نیمه فعال</Text>
                    </View>
                    <View style={styles.itemContain}>
                      {activityList()}
                    </View>
                 </View>

            </ImageBackground>
          </Animatable.View>

          <TouchableWithoutFeedback
            onPress={()=>navigation.navigate('PageActivityNeg')}
            >
            <Animatable.View  animation={'fadeIn'}
                              delay={2000}
                              style={{position: 'absolute',
                              bottom: scale(0),
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: scale(170),
                              width: scale(200)}}>
              <View style={{position: 'absolute', bottom: scale(140)}}>
                <Text style={{color: "#2b728c",
                    fontSize: scale(14),
                    fontFamily: "Yekan",}}>عادت های رفتاری غیر فعال</Text>
              </View>
              <Animatable.Image
                      animation={'fadeOut'}
                      duration={2000}
                      delay={2500}
                      iterationDelay={100}
                      iterationCount={'infinite'}
                      source={require('../../assets/images/Scroll_Down_Flash.png')}
                      style={{position: 'absolute',
                             bottom: scale(65),
                             opacity: 0.5,
                             width: scale(80),
                             height: scale(70),
                             resizeMode: 'stretch'
                             }}/>
               <Animatable.Image
                       animation={'fadeOut'}
                       duration={2000}
                       delay={3000}
                       iterationDelay={100}
                       iterationCount={'infinite'}
                       source={require('../../assets/images/Scroll_Down_Flash.png')}
                       style={{position: 'absolute',
                              bottom: scale(30),
                              opacity: 0.5,
                              width: scale(70),
                              height: scale(65),
                              resizeMode: 'stretch'
                              }}/>
                <Animatable.Image
                        animation={'fadeOut'}
                        duration={2000}
                        delay={3500}
                        iterationDelay={100}
                        iterationCount={'infinite'}
                        source={require('../../assets/images/Scroll_Down_Flash.png')}
                        style={{position: 'absolute',
                               bottom: scale(0),
                               opacity: 0.5,
                               width: scale(60),
                               height: scale(60),
                               resizeMode: 'stretch'
                               }}/>
             </Animatable.View>
           </TouchableWithoutFeedback>
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
    height: '350@s',
    width: '300@s',
    marginBottom: '100@s',
  },
  childrenContain:{
    height: "100%",
    width: "100%",
    marginTop: '50@s',
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
    fontSize: '10@s',
    fontFamily: "Yekan",
    textAlign: "center",
    marginLeft: '0@s',
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  itemContain:{
    marginTop:'10@s'
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
