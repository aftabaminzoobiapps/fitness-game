import React,{useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { soundMuteState, musicMuteState, soundPlay } from '../actions/sound/sound';
import Button from './button.js';
export default function Dialoge(props) {
  // const sound = useSelector(state => state.sound);
  const soundMute = useSelector(({sound}) => sound.soundMute);
  const musicMute = useSelector(({sound}) => sound.musicMute);
  const dispatch = useDispatch();


  function toggleModal(){
      if(props.toggleModal) props.toggleModal()
      if(props.close) props.close()
      // dispatch(soundPlay("popup"));
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
                 source={require('../../assets/images/popup.png')}>
                 <View style={{position: 'absolute', top: scale(20), alignSelf: 'center'}}>
                   <Text style={{color: "white",
                       fontSize: scale(18),
                       fontFamily: "Yekan",}}>تنظیمات</Text>
                 </View>
                 <TouchableWithoutFeedback onPress={()=>toggleModal()}>
                    <View style={styles.closeButtonContainer}>
                       <Image source={require('../../assets/images/Close.png')}
                              style={styles.closeButton}/>
                    </View>
                 </TouchableWithoutFeedback>
                 <View style={styles.childrenContain}>
                    <View style = {{flex: 1, flexDirection: 'row',justifyContent:'center'}}>
                      <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{color: "#2b728c",
                            fontSize: scale(14),
                            fontFamily: "Yekan",
                            textAlign: 'center'}}>صدا</Text>
                        <TouchableWithoutFeedback onPress={()=>dispatch(soundMuteState(!soundMute))}>
                          <View>
                          <ImageBackground resizeMode= 'stretch' style={styles.sliderBack} source={soundMute?require('../../assets/images/Green_Slider.png'):require('../../assets/images/Gray_Slider.png')}>
                            {!soundMute?<ImageBackground resizeMode= 'stretch' style={styles.slider} source={require('../../assets/images/Grey.png')}>
                              <Image style={styles.icon} source={require('../../assets/images/Sound_Icon.png')}/>
                            </ImageBackground>:<></>}
                            {soundMute?<ImageBackground resizeMode= 'stretch' style={styles.sliderLeft} source={require('../../assets/images/Green.png')}>
                              <Image style={styles.icon} source={require('../../assets/images/Sound_Icon.png')}/>
                            </ImageBackground>:<></>}
                          </ImageBackground>
                          </View>
                        </TouchableWithoutFeedback>

                      </View>
                      <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{color: "#2b728c",
                            fontSize: scale(14),
                            fontFamily: "Yekan",
                            textAlign: 'center'}}>موسیقی</Text>
                            <TouchableWithoutFeedback onPress={()=>dispatch(musicMuteState(!musicMute))}>
                              <View>
                              <ImageBackground resizeMode= 'stretch' style={styles.sliderBack} source={musicMute?require('../../assets/images/Green_Slider.png'):require('../../assets/images/Gray_Slider.png')}>
                                {!musicMute?<ImageBackground resizeMode= 'stretch' style={styles.slider} source={require('../../assets/images/Grey.png')}>
                                  <Image style={styles.icon} source={require('../../assets/images/Music_Icon.png')}/>
                                </ImageBackground>:<></>}
                                {musicMute?<ImageBackground resizeMode= 'stretch' style={styles.sliderLeft} source={require('../../assets/images/Green.png')}>
                                  <Image style={styles.icon} source={require('../../assets/images/Music_Icon.png')}/>
                                </ImageBackground>:<></>}
                              </ImageBackground>
                              </View>
                            </TouchableWithoutFeedback>
                      </View>
                    </View>

                      <Image style={styles.line} source={require('../../assets/images/Line.png')}/>
                    <TouchableWithoutFeedback onPress={()=>{toggleModal();props.navigation.navigate('PageName');}}>
                      <View style = {{flex: 1.2, flexDirection: 'row',justifyContent:'center',alignItems: 'center'}}>
                        <Image style={styles.icon} source={require('../../assets/images/edit.png')}/>
                        <Text style={{color: "#2b728c",
                            fontSize: scale(14),
                            fontFamily: "Yekan",
                            textAlign: 'center'}}> ویرایش مشخصات</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <Button text={"بستن"} onPress={()=>{
                                                          toggleModal();
                                                        }} style={styles.button}/>
                 </View>
           </ImageBackground>

    </Modal>
  );
};

const styles = ScaledSheet.create({
  dialog: {
    height: '350@s',
    width: '280@s',
    marginBottom: '50@s',
    alignSelf: 'center'
  },
  closeButtonContainer:{
    position: 'absolute',
    top: '0@s',
    left: '5@s'
  },
  closeButton:{
    resizeMode: 'stretch',
    height:'45@s',
    width:'45@s'
  },
  childrenContain:{
    alignSelf: 'center',
    height: '70%',
    width: '90%',
    marginTop: '90@s',
    alignItems: 'center',
  },
  sliderBack: {
    height: '32@s',
    width: '80@s',
    marginTop: '5@s',
    resizeMode: 'stretch',
  },
  slider:{
    height: '45@s',
    width: '45@s',
    position: 'absolute',
    top: '-8@s',
    left: '-8@s',
    justifyContent: 'center'
  },
  sliderLeft:{
    height: '45@s',
    width: '45@s',
    position: 'absolute',
    top: '-8@s',
    right: '-8@s',
    justifyContent: 'center'
  },
  icon:{
    height: '20@s',
    width: '20@s',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  line:{
    width: "70%",
    height: '1@s',
  },
  button:{
    height: '50@s',
    width: '140@s',
    marginBottom: '10@s'
  }
});
