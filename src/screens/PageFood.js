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
import Item from '../components/itemsValue.js';
import DialogeUnit from '../components/DialogeUnit.js';
import {Foods1, FoodNeeds} from '../data/foods.js';
import { dataFood1 } from '../actions/data/data_actions.js';

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
const CopilotView = walkthroughable(View);

function StartScreen({ navigation, start }) {
  const bYear = useSelector(({user}) => user.bYear);
  const bmiRange = useSelector(({user}) => user.bmiRange);
  const food1 = useSelector(({data}) => data.food1);
  const dispatch = useDispatch();

  const [foodNumber, setFoodNumber] = useState(0);
  const [isUnitVisible, setUnitVisible] = useState(false);

  function toggleUnit(){
    setUnitVisible(!isUnitVisible);
  }

  function openUnitDialoge(id)
  {
    setFoodNumber(id);
    setUnitVisible(true);
  }

  const Needs = FoodNeeds(bYear, bmiRange);

  function addFood(id){
    let foodValue = food1[id]+1;
    if(foodValue<100)
    {
      // food1[id] = foodValue;
      dispatch(dataFood1(foodValue,id))
    }

  }

  function decFood(id){
    let foodValue = food1[id]-1;
    if(foodValue>-1)
    {
      // food1[id] = foodValue;
      dispatch(dataFood1(foodValue,id))
    }

  }

  function foodList() {

      return Foods1.map((data) => {
        return (

          <Item key={data.id} needs={Needs.find(item=>item.id==data.id)} values={data} count={food1[data.id]} addPress={addFood} decPress={decFood} onClick={openUnitDialoge}/>
        )
      })
  }

  return(
    <>


      <ImageBackground
            transition={false}
            resizeMode= 'stretch'
            style={styles.container}
            source={require('../../assets/images/Sun_Backgroundhdpi.png')}>
      <DialogeUnit  isVisible={isUnitVisible}
                    toggleModal={toggleUnit}
                    data={Foods1[foodNumber]}/>
            <TouchableWithoutFeedback
              onPress={()=>navigation.pop()}>
                <Animatable.Image animation="fadeInDown" delay={1500} useNativeDriver={true} resizeMode= 'stretch'
                                     style={styles.backButton}
                                     source={require('../../assets/images/Arrow.png')}/>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>{
                                                      start();
                                                    }}>
              <Animatable.View animation="fadeInDown"
                              delay={1500}
                              style={styles.helpIcon}
                              useNativeDriver={true}>
                              <Image resizeMode= 'stretch' style={styles.helpIconImage} source={require('../../assets/images/help.png')}/>
             </Animatable.View>
            </TouchableWithoutFeedback>

          <Animatable.View animation="fadeInDown" delay={500} useNativeDriver={true}>
            <ImageBackground
                  transition={false}
                  resizeMode= 'stretch'
                  style={styles.dialog}
                  source={require('../../assets/images/Food_Good.png')}>

                  <View style={styles.childrenContain}>

                    <View style={styles.headerContain}>
                      <Text style={styles.textHeader}>تغذیه سالم</Text>
                    </View>

                    <View style={styles.itemContain}>
                      <CopilotStep
                        text="گروه های غذایی رو میتونی ثبت کنی"
                        order={1}
                        name="group"
                      >
                      <CopilotView style={styles.help1}/>
                      </CopilotStep>
                      <CopilotStep
                        text="مقدار مصرفی واحد غذایی رو کم و زیاد کن"
                        order={2}
                        name="buttons"
                      >
                      <CopilotView style={styles.help2}/>
                      </CopilotStep>
                      <CopilotStep
                        text="با کلیک روی اینجا، میتونی مقدار واحدهای غذایی رو ببینی"
                        order={3}
                        name="units"
                      >
                      <CopilotView style={styles.help3}/>
                      </CopilotStep>
                      {foodList()}
                    </View>
                    <Text style={styles.textTip}>نیاز روزانه</Text>
                 </View>

            </ImageBackground>
          </Animatable.View>

          <TouchableWithoutFeedback
            onPress={()=>navigation.navigate('PageFoodNeg')}
            >
            <Animatable.View  animation={'fadeIn'}
                              delay={2000}
                              style={{position: 'absolute',
                              bottom: scale(0),
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: scale(170),
                              width: scale(150)}}>
              <View style={{position: 'absolute', bottom: scale(140)}}>
                <Text style={{color: "#2b728c",
                    fontSize: scale(18),
                    fontFamily: "Yekan",}}>تغذیه ناسالم</Text>
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
    height: '355@s',
    width: '320@s',
    marginBottom: '80@s',
  },
  childrenContain:{
    height: "100%",
    width: "100%",
    marginTop: '5@s',
    alignItems: 'center',
  },
  headerContain:{
    marginTop: '55@s',
    width: "100%",
    height: "33@s",
    justifyContent:'flex-start'
  },
  textHeader: {
    color: "white",
    fontSize: '18@s',
    fontFamily: "Yekan",
    textAlign: "left",
    marginLeft: '60@s',
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textTip: {
    width: "100%",
    color: "#2b728c",
    fontSize: '10@s',
    fontFamily: "Yekan",
    textAlign: "left",
    marginLeft: "40@s",
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
    top: '20@s',
    left: '10@s',
    width: '90@s',
    height: '60@s',
  },
  helpIcon:{
    position: 'absolute',
    right: '19@s',
    top: '30@s'
  },
  helpIconImage:{
    height: '39@s',
    width: '39@s',
  },
  help1:{
    position: 'absolute',
    top: '15@vs',
    right: '-2@s',
    height: '50@s',
    width: '285@s'
  },
  help2:{
    position: 'absolute',
    top: '15@vs',
    right: '140@s',
    height: '50@s',
    width: '100@s',
 },
 help3:{
   position: 'absolute',
   top: '15@vs',
   right: '240@s',
   height: '50@s',
   width: '50@s',
 }
});

export default copilot({
  animated: true, // Can be true or false
  overlay: 'view', // Can be either view or svg
  labels: {
    previous: "قبلی",
    next: "بعدی",
    skip: "رد کردن",
    finish: "بستن"
  }
})(StartScreen);
