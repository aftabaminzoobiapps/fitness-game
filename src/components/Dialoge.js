import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { soundMuteState, musicMuteState, soundPlay } from '../actions/sound/sound';
import { useDispatch } from 'react-redux';

export default function Dialoge(props) {
  const dispatch = useDispatch();

  function toggleModal(){
      if(props.toggleModal) props.toggleModal()
      if(props.close) props.close()
  }

  return(
    <Modal isVisible={props.isVisible}
           //onBackdropPress={() => toggleModal()}
           onBackButtonPress={() => toggleModal()}
           animationIn="slideInDown"
           animationOut="slideOutDown"
           animationInTiming={600}
           animationOutTiming={400}
           backdropTransitionInTiming={0}
           backdropTransitionOutTiming={0}
           onModalWillShow={()=>dispatch(soundPlay('popupopen'))}
           onModalWillHide={()=>dispatch(soundPlay('popup'))}>

           <ImageBackground
                 transition={false}
                 resizeMode= 'stretch'
                 style={styles.dialog}
                 source={require('../../assets/images/Task_Border.png')}>
                 <View style={{position: 'absolute', top: scale(48),left: scale(50)}}>
                   <Text style={{color: "white",
                       fontSize: scale(15),
                       fontFamily: "Yekan",}}>پیشنهاد روزانه</Text>
                 </View>
                 <TouchableWithoutFeedback onPress={()=>toggleModal()}>
                    <View style={styles.closeButtonContainer}>
                       <Image source={require('../../assets/images/Close.png')}
                              style={styles.closeButton}/>
                    </View>
                 </TouchableWithoutFeedback>
                 <View style={styles.childrenContain}>
                  {props.children}
                 </View>
           </ImageBackground>

    </Modal>
  );
};

const styles = ScaledSheet.create({
  dialog: {
    height: '325@s',
    width: '300@s',
    marginBottom: '80@s',
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
});
