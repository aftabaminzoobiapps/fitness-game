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
import { useFocusEffect } from '@react-navigation/native';

import { scale, ScaledSheet } from 'react-native-size-matters';

import HelpButton from '../../assets/svg/HelpButton.svg';
import SettingsButton from '../../assets/svg/SettingsButton.svg';

import BarColor from '../components/barColor.js';
import Tasks from '../components/tasks.js';
import BmiIndex from '../components/bmiIndex.js';
import Plot from '../components/plot.js';
import DialogeSetting  from '../components/DialogeSetting.js';

import {store} from '../store/configureStore.js';

import { soundPlay,soundPlayMusic, soundStopMusic } from '../actions/sound/sound.js';

import {checkRules} from '../data/checkRules.js';

import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
const CopilotView = walkthroughable(View);

function StartScreen({ navigation, start}) {
  const [levelFood,setLevelFood]=useState(0);
  const [tipFood,setTipFood]=useState("");

  const [levelActivity,setLevelActivity]=useState(0);
  const [tipActivity,setTipActivity]=useState("");

  const [isSettingVisible, setSettingVisible] = useState(false);

  const dispatch = useDispatch();

  function toggleSetting(){
    setSettingVisible(!isSettingVisible);
  }

  // const state = useSelector(state => state);
  const honors = useSelector(({user}) => user.honors);
  const gender = useSelector(({user}) => user.gender);
  const bmi = useSelector(({user}) => user.bmi);
  const bmiRange = useSelector(({user}) => user.bmiRange);

  const taskRef = useRef();

  const levelUpdate=React.useCallback(() => {
    setTimeout(function() {
                            let state = store.getState();
                            let values = checkRules(state);
                            setLevelFood(values.levelFood);
                            setTipFood(values.tipFood);
                            setLevelActivity(values.levelActivity);
                            setTipActivity(values.tipActivity);
                            if(taskRef.current)taskRef.current.checkTasks(state,values);
                          },500);

  }, []);

useFocusEffect(
  levelUpdate
);

useEffect(() => {
  // setTimeout(() => {start();}, 1500)
  // console.log("Tab");
  setTimeout(() => {dispatch(soundPlayMusic("music"))}, 1000)

  return () => {
    // console.log("UnmountTab");
    dispatch(soundPlayMusic(""));
  }
},[]);
// <TouchableWithoutFeedback onPress={()=> console.log("Test")}>
//   <Animatable.View animation="bounceIn"
//                   delay={500}
//                   style={styles.helpIcon}
//                   useNativeDriver={true}>
//                   <HelpButton width={scale(50)} height={scale(50)}/>
//  </Animatable.View>
// </TouchableWithoutFeedback>

  return(
    <>
      <DialogeSetting isVisible={isSettingVisible}
                 toggleModal={toggleSetting}
                 navigation= {navigation}/>
      <ImageBackground
            transition={false}
            resizeMode= 'stretch'
            style={styles.container}
            source={require('../../assets/images/mainBack.png')}>

            <Animatable.View animation="bounceIn"
                            delay={500}
                            style={styles.honorContainer}
                            useNativeDriver={true}>

                              <CopilotStep
                                text="جمع مدال هایی که روزانه بدست اوردی اینجاست"
                                order={4}
                                name="medal"
                              >
                              <CopilotView style={styles.help4}/>
                              </CopilotStep>
                              <ImageBackground resizeMode= 'stretch' style={styles.countContainer} source={require('../../assets/images/Honor_Box.png')}>
                                <Text style={styles.countText}>{honors}</Text>
                              </ImageBackground>

                              <Image resizeMode= 'stretch' style={styles.honorIcon} source={require('../../assets/images/Honor.png')}/>

           </Animatable.View>




            <TouchableWithoutFeedback onPress={()=>{
                                                      toggleSetting();
                                                    }}>
              <Animatable.View animation="bounceIn"
                              delay={500}
                              style={styles.settingIcon}
                              useNativeDriver={true}>
                              <SettingsButton width={scale(50)} height={scale(50)}/>
             </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>{
                                                      start();
                                                    }}>
              <Animatable.View animation="bounceIn"
                              delay={500}
                              style={styles.helpIcon}
                              useNativeDriver={true}>
                              <Image resizeMode= 'stretch' style={styles.helpIconImage} source={require('../../assets/images/help.png')}/>
             </Animatable.View>
            </TouchableWithoutFeedback>

            <Animatable.View animation="bounceIn"
                            delay={800}
                            style={styles.avatarContainer}
                            useNativeDriver={true}>
                            <TouchableWithoutFeedback onPress={()=>console.log("Press")}>
                              {gender==0?
                                    <ImageBackground
                                        transition={false}
                                        resizeMode= 'stretch'
                                        style={styles.avatar}
                                        source={require('../../assets/images/avatarGirl.png')}/>:
                                    <ImageBackground
                                        transition={false}
                                        resizeMode= 'stretch'
                                        style={styles.avatar}
                                        source={require('../../assets/images/avatarBoy.png')}/>}
                            </TouchableWithoutFeedback>

                                <View style={styles.taskMail}>
                                    <CopilotStep
                                      text="پیشنهادهای روزانه اینجاست. اگه کامل کنی مدال میگیری"
                                      order={3}
                                      name="tasks"
                                    >
                                    <CopilotView style={styles.help3}/>
                                    </CopilotStep>
                                      <Tasks ref={taskRef} delay={1300}/>
                               </View>

            </Animatable.View>

            <Animatable.View animation="fadeInUp"
                            delay={1500}
                            style={styles.bmiContainer}
                            useNativeDriver={true}>
                            <BmiIndex range={bmiRange} bmi={bmi}/>
            </Animatable.View>

            <TouchableWithoutFeedback  onPress={()=>navigation.navigate('PageActivity')}>
              <Animatable.View animation="fadeInLeft"
                              delay={1900}
                              style={styles.activityIcon}
                              useNativeDriver={true}>
                              <CopilotStep
                                text="فعالیت امروزت رو اینجا ثبت کن"
                                order={2}
                                name="activity"
                              >
                              <CopilotView style={styles.help1}/>
                              </CopilotStep>
                              <ImageBackground
                                    transition={false}
                                    resizeMode= 'stretch'
                                    style={{height: scale(140),width: scale(130)}}
                                    source={require('../../assets/images/Activity_iconhdpi.png')}>

                              </ImageBackground>
                              <BarColor icon={'ios-bicycle'} info={0} level={levelActivity} tip={tipActivity}/>
             </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>navigation.navigate('PageFood')}>
              <Animatable.View animation="fadeInRight"
                              delay={1900}
                              style={styles.foodIcon}
                              useNativeDriver={true}>
                              <CopilotStep
                                text="مصرف غذایی امروزت رو اینجا ثبت کن"
                                order={1}
                                name="food"
                              >
                              <CopilotView style={styles.help1}/>
                              </CopilotStep>
                              <ImageBackground
                                    transition={false}
                                    resizeMode= 'stretch'
                                    style={{height: scale(140),width: scale(130)}}
                                    source={require('../../assets/images/Food_icon_hdpi.png')}>

                              </ImageBackground>
                              <BarColor icon={'restaurant'} info={1} level={levelFood} tip={tipFood}/>
             </Animatable.View>
            </TouchableWithoutFeedback>

            <Animatable.View animation="fadeInUp"
                            delay={2000}
                            style={styles.plotContainer}
                            useNativeDriver={true}>
                            <Plot/>
            </Animatable.View>
      </ImageBackground>
    </>
  );
}
const styles1 = StyleSheet.create({
  test:{
    position: 'absolute',
    alignSelf: 'flex-start'
  },
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column",
    backgroundColor: "#0f3648"
  },
  avatarContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    height: '150@s',
    width: '150@s',
    top: '50@s',
  },
  avatar:{
    position: 'absolute',
    alignSelf: 'center',
    height: '140@s',
    width: '140@s',
  },
  taskMail:{
    position: 'absolute',
    left: '0@s',
    bottom: '-10@s',
  },
  bmiContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    height: '50@s',
    width: '150@s',
    top: '80@s',
  },
  helpIcon:{
    position: 'absolute',
    right: '15@s',
    top: '20@s'
  },
  settingIcon:{
    position: 'absolute',
    left: '15@s',
    top: '20@s'
  },
  helpIcon:{
    position: 'absolute',
    left: '19@s',
    top: '73@s'
  },
  helpIconImage:{
    height: '39@s',
    width: '39@s',
  },
  activityIcon:{
    position: 'absolute',
    height: '180@s',
    width: '130@s',
    right: '30@s',
    top: '300@s'
  },
  foodIcon:{
    position: 'absolute',
    height: '180@s',
    width: '130@s',
    left: '30@s',
    top: '300@s',
  },
  honorContainer:{
    width:'90@s',
    height: '40@s',
    position: 'absolute',
    right: '15@s',
    top: '25@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  honorIcon:{
    position: 'absolute',
    height: '45@s',
    width: '42@s',
    right:0,
  },
  countContainer:{
    height: '30@s',
    width: '50@s',
    justifyContent: 'center',
    marginRight: '15@s',
    marginBottom: '7@s'
  },
  countText: {
    fontFamily: "Yekan",
    fontSize: '15@s',
    textAlign:'center',
    color: "#2b728c",
  },
  plotContainer:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '115@s',
    left: '20@s',
    right: '20@s',
    bottom: '5@s',
  },
  help1:{
    position: 'absolute',
    top: '20@vs',
    right: '-2@s',
    height: '150@s',
    width: '130@s',
  },
  help3: {
    position: 'absolute',
    top: '20@vs',
    right: '-2@s',
    height: '50@s',
    width: '80@s',
  },
  help4:{
  position: 'absolute',
  top: '15@vs',
  right: '-2@s',
  height: '50@s',
  width: '80@s'
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
