import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView
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

  function items()
  {
    return props.data.units.map((data,index) => {
      return (
        <View key={index} style={{...styles.itemTextContainerRow,backgroundColor: index%2==0?"#dffff6":"#fff"}}>
          <Text style={styles.textItemName}>{data.name}</Text>
          <Text style={styles.textItemValue}>{data.value}</Text>
        </View>
      )
    })

  }

  console.log(props.data);
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
                 <View style={{position: 'absolute', top: scale(28), alignSelf: 'center'}}>
                   <Text style={{color: "white",
                       fontSize: scale(15),
                       fontFamily: "Yekan",}}>راهنمای واحد غذایی</Text>
                 </View>
                 <TouchableWithoutFeedback onPress={()=>toggleModal()}>
                    <View style={styles.closeButtonContainer}>
                       <Image source={require('../../assets/images/Close.png')}
                              style={styles.closeButton}/>
                    </View>
                 </TouchableWithoutFeedback>
                 <View style={styles.childrenContain}>

                    <View style={styles.item}>

                      <Image source={props.data.icon} style={styles.itemImageContainer}/>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.textItemMain}>{props.data.name}</Text>
                      </View>

                    </View>

                    <View style={{...styles.item, height: scale(20),marginTop:scale(10), marginBottom: 0}}>
                      <View style={styles.itemTextContainerRow}>
                        <Text style={styles.textItemDescribe}>ماده غذایی</Text>
                        <Text style={styles.textItemDescribe}>مقدار هر واحد</Text>
                      </View>
                    </View>
                    <Image style={styles.line} source={require('../../assets/images/Line.png')}/>
                    <ScrollView persistentScrollbar={true} style={{ width: "80%", marginTop: scale(7)}}>
                      {items()}
                    </ScrollView>
                 </View>
           </ImageBackground>

    </Modal>
  );
};

const styles = ScaledSheet.create({
  dialog: {
    height: '380@s',
    width: '300@s',
    marginBottom: '80@s',
  },
  closeButtonContainer:{
    position: 'absolute',
    top: '5@s'
  },
  closeButton:{
    resizeMode: 'stretch',
    height:'40@s',
    width:'40@s'
  },
  childrenContain:{
    height: "265@s",
    width: "100%",
    marginTop: '70@s',
    alignItems: 'center',
  },
  item:{
    width: "75%",
    height: "45@s",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'flex-start' ,
    marginBottom: '3@s'
  },
  itemImageContainer:{
    height: "40@s",
    width: "40@s",
    borderRadius: "10@s",
    marginRight: "5@s",
  },
  itemTextContainer:{
    height: "35@s",
    width: "130@s",
    marginLeft: "8@s",
  },
  itemTextContainerRow:{
    height: "35@s",
    width: "100%",
    flexDirection: "row"
  },
  textItemMain: {
    color: "#fe82a4",
    fontSize: '15@s',
    height: '50@s',
    fontWeight: "bold",
    fontFamily: "Yekan",
    textAlign: "left",
    marginRight: "3@s",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textItemDescribe: {
    color: "#2b728c",
    fontSize: '12@s',
    height: '20@s',
    flex:1,
    // fontWeight: "bold",
    marginLeft: "4@s",
    fontFamily: "Yekan",
    textAlign: "center",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textItemName: {
    color: "#2b728c",
    fontSize: '12@s',
    flex:1,
    marginLeft: "5@s",
    // fontWeight: "bold",
    fontFamily: "Yekan",
    textAlign: "left",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textItemValue: {
    color: "#fe82a4",
    fontSize: '12@s',
    flex:1,
    marginLeft: "8@s",
    // fontWeight: "bold",
    fontFamily: "Yekan",
    textAlign: "left",
    textShadowColor: 'rgba(255, 255, 255, .75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  line:{
    width: "70%",
    height: '1@s',
  },
});
