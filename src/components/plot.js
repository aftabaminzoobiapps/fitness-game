import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { scale,ScaledSheet } from 'react-native-size-matters';
import {todayDays, weekDay} from '../data/checkRules.js';


export default function plot() {
  const [medal,setMedal]=useState(new Array(7).fill(false));
  const [level,setLevel]=useState(new Array(7).fill(-1));
  const [today,setToday]=useState(0);
  const [weekDayState, setWeekDay]=useState(0);

  useEffect(()=>{
    let Today = todayDays();
    let WeekDay = weekDay(WeekDay);
    setToday(Today);
    setWeekDay(WeekDay)
    weeklyData(Today,WeekDay);
  },[]);

  function weeklyData(todayValue,weekDayValue)
  {

     db.transaction(async tx => {
       tx.executeSql('SELECT * FROM daily_data WHERE Day BETWEEN '+(todayValue-weekDayValue).toString() +' AND ' +todayValue.toString(), [],
        (tx, results) => {
        let data = results.rows.length;
        let levels = new Array(7).fill(-1);
        let medals = new Array(7).fill(false);
        var i;
        for (i = 0; i < data; i++) {
          let day = results.rows.item(i)["Day"];
          let activityLevel = results.rows.item(i)["ActivityLevel"];
          let foodLevel = results.rows.item(i)["FoodLevel"];
          let medal = results.rows.item(i)["Honor"];
          let weekLast = todayValue-day;
          console.log(weekLast);
          if(weekLast>0)
          {
            levels[weekDayValue-weekLast-1] = Math.min(activityLevel,foodLevel);
            if(medal>0) medals[weekDayValue-weekLast-1]=true;
          }
        }
        for (i = 0; i < weekDayValue-1; i++) {
          if(levels[i]==-1)
            levels[i]=0;
        }

        setMedal(medals);
        setLevel(levels);
        });
    });
  }

  function showPlot(pos)
  {
      return(
        <>
              <View style={{flex:1, zIndex: 100}}>
                {medal[pos]?<Image style={{height: scale(20), width: scale(20)}} source={require('../../assets/images/medal.png')}/>:<></>}
              </View>
              <View style={{flex:1}}>
                {level[pos]==3?<Image style={{height: scale(20), width: scale(20)}} source={require('../../assets/images/Green.png')}/>:<></>}
              </View>
              <View style={{flex:1}}>
                {level[pos]==2?<Image style={{height: scale(20), width: scale(20)}} source={require('../../assets/images/Yellow.png')}/>:<></>}
              </View>
              <View style={{flex:1}}>
                {level[pos]==1?<Image style={{height: scale(20), width: scale(20)}} source={require('../../assets/images/Red.png')}/>:<></>}
              </View>
              <View style={{flex:1}}>
                {level[pos]==0?<Image style={{height: scale(20), width: scale(20)}} source={require('../../assets/images/Grey.png')}/>:<></>}
              </View>
        </>
            );
  }

  return(
    <View  style={styles.plotContainer}>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==1?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(0)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>شنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==2?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(1)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>یکشنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==3?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(2)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>دوشنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==4?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(3)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>سه شنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==5?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(4)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>چهارشنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==6?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(5)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>پنج شنبه</Text>
                          </View>
                        </View>
                        <View style={{...styles.bmiParts,backgroundColor: weekDayState==7?"#d0e0ff":'#f0f0f0'}}>
                          {showPlot(6)}
                          <View style={{flex:1.5}}>
                            <Text style={styles.textValues}>جمعه</Text>
                          </View>
                        </View>
                        <View style={styles.bmiParts}>
                          <View style={{flex:1}}>
                            <Text style={styles.textValuesLabel}></Text>
                          </View>
                          <View style={{flex:1}}>
                            <Text style={{...styles.textValuesLabel,color:"#0f0"}}>عالی</Text>
                          </View>
                          <View style={{flex:1}}>
                            <Text style={{...styles.textValuesLabel,color:"#fa0"}}>متوسط</Text>
                          </View>
                          <View style={{flex:1}}>
                            <Text style={{...styles.textValuesLabel,color:"#f00"}}>بد</Text>
                          </View>
                          <View style={{flex:1}}>
                            <Text style={styles.textValuesLabel}>ثبت نکردی</Text>
                          </View>
                          <View style={{flex:1.5}}>
                          </View>
                        </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  plotContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: '10@s',
    paddingLeft: '10@s'
  },
  bmiValueContainer:{
    height: '40@s',
    width: '45@s',
    position: 'absolute',
    top: '-35@s'
  },
  bmiParts:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textValues: {
    color: "#a2a2a2",
    marginTop: '4@s',
    marginBottom: '8@s',
    fontSize: '9@s',
    fontFamily: "Yekan",
    textAlign: "center",
    transform: [{ rotate: '-45deg'}]
  },
  textValuesLabel: {
    color: "#a2a2a2",
    fontSize: '9@s',
    marginTop: '-5@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  textBMIValues: {
    color: "white",
    marginBottom: '8@s',
    fontSize: '15@s',
    fontFamily: "Yekan",
    textAlign: "center",
  },
  textTitle: {
    color: "#0f3648",
    marginBottom: '8@s',
    fontSize: '12@s',
    fontFamily: "Yekan",
    textAlign: "center",

  },
});
