import React,{useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import Modal from 'react-native-modal';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Button from './button.js';
import * as Animatable from 'react-native-animatable';
import MakeItRain from './MakeItRain.js';
import { soundMuteState, musicMuteState, soundPlay } from '../actions/sound/sound';
import { useDispatch } from 'react-redux';

export default function Dialoge(props) {
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  function StartImageRotate() {
  rotateValue.setValue(0);

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
   ).start();
  };

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    StartImageRotate();
  }, []);

  StartImageRotate();

  function toggleModal(){
      if(props.toggleModal) props.toggleModal()
      if(props.close) props.close()
  }

  return(
    <Modal isVisible={props.isVisible}
           //onBackdropPress={() => toggleModal()}
           onBackButtonPress={() => toggleModal()}
           animationIn="bounceIn"
           animationOut="bounceOut"
           animationInTiming={600}
           animationOutTiming={600}
           backdropTransitionInTiming={500}
           backdropTransitionOutTiming={800}
           onModalWillShow={()=>dispatch(soundPlay('win'))}
           onModalWillHide={()=>dispatch(soundPlay('popup'))}>
           <Animated.Image
                 transition={false}
                 resizeMode= 'stretch'
                 style={{...styles.shine, transform: [{ rotate: RotateData }]}}
                 source={require('../../assets/images/win_shine.png')}/>
            <MakeItRain/>
           <ImageBackground
                 transition={false}
                 resizeMode= 'stretch'
                 style={styles.dialog}
                 source={require('../../assets/images/win_dialoge.png')}>

                 <View style={styles.childrenContain}>
                 <Animatable.View animation="bounceIn"
                                 delay={500}
                                 style={styles.textHeaderContainer}
                                 useNativeDriver={true}>
                                 <Text style={styles.textHeader}>تـبریـک</Text>
                 </Animatable.View>
                 <Animatable.View animation="bounceIn"
                                 delay={1000}
                                 style={styles.textHeaderContainer2}
                                 useNativeDriver={true}>
                                 <Image  transition={false}
                                                   resizeMode= 'stretch'
                                                   style={styles.tick}
                                                   source={require('../../assets/images/greenTick.png')}/>
                                 <Text style={{...styles.textHeader2,color: "#e46d8d"}}> 5</Text>
                                 <Text style={styles.textHeader2}>وظیفه روزانه کامل شد</Text>

                 </Animatable.View>
                 <Button text={"متوجه شدم"} onPress={()=>{
                                                       toggleModal();
                                                     }} style={styles.button}/>
                 </View>

           </ImageBackground>

    </Modal>
  );
};

const styles = ScaledSheet.create({
  dialog: {
    height: '325@s',
    width: '300@s',
    marginBottom: '90@s',
  },
  shine:{
    position: 'absolute',
    height: '800@s',
    width: '600@s',
    bottom: '-100@s',
    alignSelf: 'center',
  },
  closeButtonContainer:{
    position: 'absolute',
    top: '15@s'
  },
  closeButton:{
    resizeMode: 'stretch',
    height:'40@s',
    width:'40@s'
  },
  childrenContain:{
    height: "100%",
    width: "100%",
    marginTop: '90@s',
    alignItems: 'center',
  },
  button:{
    height: '50@s',
    width: '160@s',
    position: 'absolute',
    bottom: '110@s'
  },
  textHeaderContainer:{
    position: 'absolute',
    top: '70@s',
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
  textHeaderContainer2:{
    position: 'absolute',
    bottom: '165@s',
    flexDirection: 'row'
  },
  textHeader2: {
    color: "#2b728c",
    fontSize: '15@s',
    fontFamily: "Yekan",
    textAlign: "center",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  tick: {
    marginRight:'5@s',
    height: '20@s',
    width: '20@s',
  },
});
