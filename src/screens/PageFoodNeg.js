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
import {Foods2} from '../data/foods.js';
import { dataFood2 } from '../actions/data/data_actions.js';

export default function PageFoodNeg({ navigation }) {
  const food2 = useSelector(({data}) => data.food2);
  const dispatch = useDispatch();

  function addFood(id){
    let foodValue=food2[id]+1;
    if(foodValue<10)
    {
      // food1[id] = foodValue;
      dispatch(dataFood2(foodValue,id))
    }

  }

  function decFood(id){
    let foodValue=food2[id]-1;
    if(foodValue>-1)
    {
      // food1[id] = foodValue;
      dispatch(dataFood2(foodValue,id))
    }

  }

  function foodList() {

      return Foods2 && Foods2.map((data) => {
        return (

          <Item key={data.id} values={data} count={food2[data.id]} addPress={addFood} decPress={decFood}/>
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
                  source={require('../../assets/images/Food_Bad.png')}>

                  <View style={styles.childrenContain}>

                    <View style={styles.headerContain}>
                      <Text style={styles.textHeader}>تغذیه ناسالم</Text>
                    </View>
                    <View style={styles.itemContain}>
                      {foodList()}
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
    marginTop: '5@s',
    alignItems: 'center',
  },
  headerContain:{
    marginTop: '45@s',
    width: "100%",
    height: "33@s",
    justifyContent:'flex-start'
  },
  textHeader: {
    color: "white",
    fontSize: '16@s',
    fontFamily: "Yekan",
    textAlign: "right",
    marginRight: '55@s',
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
