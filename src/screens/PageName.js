import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
// const { width, height } = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';
import RadioButton from '../components/radioBtn.js';
import Button from '../components/button.js';
import PopUp from '../components/popup.js';

import { useDispatch } from 'react-redux';
import { userName,userGender } from '../actions/user/user_data';

import { ScaledSheet } from 'react-native-size-matters';

export default function StartScreen({ navigation }) {
  const [name,setName]=useState('');
  const [gender,setGender]=useState(0);
  const dispatch = useDispatch();

  return(
    <View style={styles.container}>

        <Animatable.View animation="fadeInDown" delay={500} useNativeDriver={true}>
          <PopUp style={styles.image} headerText={"خوش آمدید !"}>

            <View style={{flex: 1,alignItems: 'center'}}>

                  <Text style={styles.textTitle}>اسم خودت رو اینجا بنویس</Text>
                  <TextInput
                    style={styles.TextInputStyleClass}
                    placeholderTextColor = "#8ab6c5"
                    placeholder="نام دلخواه"
                    value={name}
                    onChangeText={(value)=>setName(value)}
                    maxLength={10}
                  />

                  <View style={styles.dialogContainer}>

                    <Animatable.View animation="fadeInRight"
                                    delay={1000}
                                    style={{flex: 1}}
                                    useNativeDriver={true}>
                      <View style={styles.genderIcon}>
                      <RadioButton checked={gender==1} onPress={()=>setGender(1)} style={styles.radioButton}/>
                      <Image style={styles.avatar} source={require('../../assets/images/boy.png')}/>
                      </View>
                      <Text style={styles.textGender}>پسر هستم</Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInLeft"
                                    delay={1000}
                                    style={{flex: 1}}
                                    useNativeDriver={true}>
                    <View style={styles.genderIcon}>
                      <RadioButton checked={gender==0} onPress={()=>setGender(0)} style={styles.radioButton}/>
                      <Image style={styles.avatar} source={require('../../assets/images/girl.png')}/>
                    </View>
                    <Text style={styles.textGender}>دختر هستم</Text>
                    </Animatable.View>

                  </View>

                  <Animatable.View animation="bounceIn" delay={1500} useNativeDriver={true}>

                    <Button text={"بعدی"} onPress={()=>{
                                                          dispatch(userName(name));
                                                          dispatch(userGender(gender));
                                                          navigation.push('PageProperties')
                                                        }} style={styles.button}/>

                  </Animatable.View>
            </View>

          </PopUp>
        </Animatable.View>

    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    backgroundColor: "#0f3648"
  },
  dialogContainer:{
    height:'110@s',
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '30@s',
    marginBottom: '10@s',
    marginTop: '15@s'
  },
  image: {
    aspectRatio: 1.1,
    width: '310@s',
    resizeMode: "stretch",
    justifyContent: "center"
  },
  textTitle: {
    color: "#e46d8d",
    fontSize: '18@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  textGender: {
    color: "#2b728c",
    fontSize: '13@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  radioButton:{
    height: '40@s',
    width: '40@s',
    marginRight: '-30@s',
    marginBottom: '-20@s',
    zIndex: 10
  },
  genderIcon:{
    height:'80@s',
    alignItems:'center',
    flexDirection: 'row',
  },
  TextInputStyleClass:{
    marginTop: 10,
    width: '180@s',
    paddingHorizontal: '15@s',
    paddingVertical: '3@s',
    fontFamily: "Yekan",
    fontSize: '15@s',
    fontWeight: '300',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: '20@s' ,
    borderColor: "#cfedf3",
    backgroundColor : "#e2f4f9",
  },
  avatar:{
    width: "80%",
    height: '100@s',
    resizeMode: 'contain'
  },
  button:{
    height: '50@s',
    width: '160@s',
  }
});
