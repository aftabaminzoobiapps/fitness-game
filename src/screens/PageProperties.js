import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';
import RadioButton from '../components/radioBtn.js';
import Button from '../components/button.js';
import ButtonUp from '../components/buttonUp.js';
import ButtonDown from '../components/buttonDown.js';
import PopUp from '../components/popup.js';
import { Picker } from 'react-native-wheel-pick';
import {
  WheelPicker,
} from "react-native-wheel-picker-android";
import BmiIndex from '../components/bmiIndex.js';
import { useDispatch, useSelector } from 'react-redux';
import { userYear,userMonth,userBMI,userBMIRange,userHeight,userWeight } from '../actions/user/user_data';

import { scale,ScaledSheet } from 'react-native-size-matters';

import moment from "moment-jalaali";
import { CommonActions } from '@react-navigation/native';

// import {openDatabase} from 'react-native-sqlite-storage';
// const db = openDatabase(
//           {
//             name: 'database1.db',
//             createFromLocation: 1
//           },
//           // ()=>console.log("Database Success"),
//           // ()=>console.log("Daatbase Fail")
//           );



const Years=Array(14).fill().map((_,idx)=>(moment().jYear()-5-idx).toString());

export default function StartScreen({ navigation }) {
  const gender = useSelector(state => state.user.gender);
  const [height,setHeight]=useState("110");
  const [weight,setWeight]=useState("20");
  const [bYear,setbYear]=useState(moment().jYear()-5);
  const [bMonth,setbMonth]=useState(0);
  const [bmiRange,setBmiRange]=useState(2);
  const [bmi, setBmi]=useState(16.5);
  const [disableButton, setDisableButton]=useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    checkBMIRange();
  },[height,weight,bYear,bMonth]);

  function nextPage()
  {
    if(bmiRange>-1 && disableButton)
      {
          let heightNum=110;
          let weightNum=20;
          if(!isNaN(parseFloat(height)))
          {
            dispatch(userHeight(parseFloat(height)));
          }
          if(!isNaN(parseFloat(weight)))
          {
            dispatch(userWeight(parseFloat(weight)));
          }
          dispatch(userYear(bYear));
          dispatch(userMonth(bMonth));
          dispatch(userBMI(bmi));
          dispatch(userBMIRange(bmiRange));
          navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'PageMain' },
            ],
          })
        );
      }
  }
  // useEffect(()=>{
  //
  //
  //       // navigation.push('PageMain')
  //   }
  //
  // },[bmiRange])

  async function checkBMIRange()
  {
      setDisableButton(false);
      let heightNum=110;
      let weightNum=20;
      if(!isNaN(parseFloat(height)))
      {
        // dispatch(userHeight(parseFloat(height)));
        heightNum=parseFloat(height);
      }
      if(!isNaN(parseFloat(weight)))
      {
        // dispatch(userWeight(parseFloat(weight)));
        weightNum=parseFloat(weight);
      }


      let bmiValue=weight/((height/100)**2);
      setBmi(bmiValue);

      let month=(moment().jYear()-bYear)*12+(moment().jMonth()-bMonth)

      await db.transaction(async tx => {
      let dataset = gender==0?'bmi_girls':'bmi_boys'
      await tx.executeSql('SELECT * FROM '+ dataset +' WHERE Month='+month.toString(), [], (tx, results) => {
        let data = results.rows.length;
        // for (let i = 0; i < results.rows.length; i++) {
        //     console.log(results.rows.item(i));                   //looping through each row in the table and storing it as object in the 'users' array
        //  }
         let bmiRangeValue= -1;
         if(data>0)
         {
           if(bmiValue<results.rows.item(0)["SD3neg"])
             bmiRangeValue=0;
           else if(bmiValue<results.rows.item(0)["SD2neg"])
             bmiRangeValue=1;
           else if(bmiValue<results.rows.item(0)["SD1"])
             bmiRangeValue=2;
           else if(bmiValue<results.rows.item(0)["SD2"])
             bmiRangeValue=3;
           else
             bmiRangeValue=4;
         }
         // console.log(results.rows.item(0)["SD2neg"]);
         // console.log(bmiRangeValue);
         setBmiRange(bmiRangeValue);
         setDisableButton(true);
      });
    });
  }

  return(
    <View style={styles.container}>

        <Animatable.View animation="fadeInDown" delay={500} useNativeDriver={true}>
          <PopUp style={styles.image} headerText={"????????????"}>

            <View style={{flex: 1,alignItems: 'center',marginTop: -15}}>

                  <Animatable.View animation="fadeInRight"
                                  delay={1000}
                                  style={styles.dialogContainer}
                                  useNativeDriver={true}>
                      <View style={{flex:.8, alignItems: 'center',justifyContent:'center'}}>
                        <ButtonUp style={styles.buttonUp} onPress={()=>{if(!isNaN(parseFloat(height)))
                                                                          setHeight((parseFloat(height)+1).toFixed(0));
                                                                        else setHeight("110");}}/>
                        <ButtonDown style={styles.buttonUp} onPress={()=>{if(!isNaN(parseFloat(height)))
                                                                            {
                                                                              if(parseFloat(height)>10)
                                                                                setHeight((parseFloat(height)-1).toFixed(0));

                                                                            }
                                                                            else setHeight("20");}}/>
                      </View>

                      <View style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
                        <Text style={styles.textGender}>????</Text>
                        <TextInput
                          style={styles.TextInputStyleClass}
                          placeholderTextColor = "#8ab6c5"
                          placeholder=""
                          numeric
                          value={height}
                          keyboardType='number-pad'
                          onChangeText={(value)=>{setHeight(value)}}
                          onBlur={()=>{if(isNaN(parseFloat(height)))
                                        setHeight("110");
                                       if(parseFloat(height)<10)
                                        setHeight("10");
                                      }}
                          maxLength={10}
                        />
                      </View>

                      <Image style={styles.avatar} source={require('../../assets/images/Height.png')}/>

                  </Animatable.View>

                  <Image style={styles.line} source={require('../../assets/images/Line.png')}/>

                  <Animatable.View animation="fadeInRight"
                                  delay={1200}
                                  style={styles.dialogContainer}
                                  useNativeDriver={true}>
                      <View style={{flex:.8, alignItems: 'center',justifyContent:'center'}}>
                        <ButtonUp style={styles.buttonUp} onPress={()=>{if(!isNaN(parseFloat(weight)))
                                                                          setWeight((parseFloat(weight)+0.1).toFixed(1));
                                                                        else setWeight("20");}}/>
                        <ButtonDown style={styles.buttonUp} onPress={()=>{if(!isNaN(parseFloat(weight)))
                                                                            {
                                                                              if(parseFloat(weight)>1)
                                                                                setWeight((parseFloat(weight)-0.1).toFixed(1));

                                                                            }
                                                                            else setWeight("20");}}/>
                      </View>

                      <View style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
                        <Text style={styles.textGender}>??????</Text>
                        <TextInput
                          style={styles.TextInputStyleClass}
                          placeholderTextColor = "#8ab6c5"
                          placeholder=""
                          numeric
                          value={weight}
                          keyboardType='number-pad'
                          onChangeText={(value)=>{setWeight(value);}}
                          onBlur={()=>{if(isNaN(parseFloat(weight)))
                                        setWeight("20");
                                       if(parseFloat(weight)<1)
                                        setWeight("1");
                                      }}
                          maxLength={10}
                        />
                      </View>

                      <Image style={styles.avatar} source={require('../../assets/images/Weight.png')}/>

                  </Animatable.View>

                  <Image style={styles.line} source={require('../../assets/images/Line.png')}/>
                  <Animatable.View animation="fadeInRight"
                                  delay={1400}
                                  style={{}}>
                    <Text style={styles.textDate}>?????????? ????????</Text>
                    <View style={{flexDirection: 'row'}}>
                    <WheelPicker
                      style={styles.picker}
                      selectedItem={bMonth}
                      data={['??????????????', '????????????????', '??????????', '??????', '??????????', '????????????', '??????','????????','??????','????','????????','??????????']}
                      onItemSelected={value => { setbMonth(value);}}
                      selectedItemTextFontFamily={'Yekan'}
                      itemTextFontFamily={'Yekan'}
                      selectedItemTextColor={'#2b728c'}
                      isCyclic={true}
                      itemTextSize={scale(12)}
                      selectedItemTextSize={scale(12)}
                    />
                    <WheelPicker
                      style={styles.picker}
                      selectedItem={0}
                      data={Years}
                      onItemSelected={value => {setbYear(parseInt(Years[value])); }}
                      selectedItemTextFontFamily={'Yekan'}
                      itemTextFontFamily={'Yekan'}
                      selectedItemTextColor={'#2b728c'}
                      itemTextSize={scale(12)}
                      selectedItemTextSize={scale(12)}
                    />
                    </View>
                  </Animatable.View>

                  <Animatable.View animation="bounceIn" delay={1800} useNativeDriver={true}>
                    <Button text={"????????"} onPress={()=>{nextPage();}} style={styles.button}/>
                  </Animatable.View>

            </View>

          </PopUp>
        </Animatable.View>
        <Animatable.View animation="fadeInUp"
                        delay={2000}
                        style={styles.bmiContainer}
                        useNativeDriver={true}>
                        <BmiIndex range={bmiRange} bmi={bmi}/>
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
    height:'80@s',
    flexDirection: 'row',
    marginLeft: '30@s',
    marginRight: '30@s',
    marginBottom: '10@s',
    marginTop: '15@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    aspectRatio: .8,
    width: '320@s',
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
    marginTop:'-30@s',
    color: "#2b728c",
    fontSize: '20@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  textDate: {
    color: "#2b728c",
    fontSize: '16@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  TextInputStyleClass:{
    height: '35@s',
    marginTop: 5,
    width: '90@s',
    paddingHorizontal: '15@s',
    paddingVertical: '3@s',
    fontFamily: "Yekan",
    fontSize: '17@s',
    fontWeight: '300',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: '10@s' ,
    borderColor: "#cfedf3",
    backgroundColor : "#e2f4f9",
    color: "#2b728c",
  },
  avatar:{
    flex:.8 ,
    height: '80@s',
    resizeMode: 'contain',
  },
  button:{
    height: '50@s',
    width: '160@s',
  },
  buttonUp:{
    height: '40@s',
    width: '40@s',
    margin: '4@s'
  },
  line:{
    width: "70%",
    height: '1@s',
  },
  picker:{
    width: '100@s',
    height: '100@s',
  },
  bmiContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15@s',
    height: '50@s',
    width: '150@s',
    bottom: '-15@s',
  },
});
