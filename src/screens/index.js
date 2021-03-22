import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
import PushPole from 'pushpole-react-native';
import PageName from "./PageName.js"
import PageProperties from "./PageProperties.js"
import PageMain from "./PageMain.js"
import PageFood from "./PageFood.js"
import PageFoodNeg from "./PageFoodNeg.js"
import PageActivity from "./PageActivity.js"
import PageActivityHalf from "./PageActivityHalf.js"
import PageActivityNeg from "./PageActivityNeg.js"
import SoundController from '../components/soundController.js'
import {RightTransition,LeftTransition,UpTransition} from "./transitions.js"
import { useDispatch, useSelector } from 'react-redux';
import { userHonorToday, userHonors } from '../actions/user/user_data';
import { dataDate, dataReset } from '../actions/data/data_actions.js';

import {todayDays, checkRules} from '../data/checkRules.js';

import {store} from '../store/configureStore.js';


const Stack = createStackNavigator();

export default function Screens(props) {
  const todayHonor = useSelector(({user}) => user.todayHonor);
  const honors = useSelector(({user}) => user.honors);
  const bmi = useSelector(({user}) => user.bmi);

  const lastDay = useSelector(({data}) => data.lastDay);

  const state = store.getState();

  const [todayChecked,setTodayChecked] = useState(false);
  const dispatch = useDispatch();

  // console.log(state);
   function saveData(levels)
  {

       db.transaction( tx => {
        tx.executeSql(
        'INSERT INTO daily_data (Honor, FoodLevel, ActivityLevel, Day, Food1, Food2, Activity1, Activity2, Activity3) VALUES (?,?,?,?,?,?,?,?,?)',
        [state.user.todayHonor , levels.levelFood, levels.levelActivity , lastDay, state.data.food1.toString(), state.data.food2.toString(), state.data.active1.toString(),state.data.active2.toString(),state.data.active3.toString()],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          let Today = todayDays();
          dispatch(dataDate(Today));
          if(todayHonor)
            dispatch(userHonors(honors+1));
          dispatch(userHonorToday(false));
          dispatch(dataReset());
          setTodayChecked(true);
        },
        (error)=>console.log(error)
      )
      });
  }

  useEffect(()=>{
    if(bmi==0)
      setTodayChecked(true);
    else {
      let Today = todayDays();
      if(Today!=lastDay)
      {
        setTodayChecked(false);
        let levels = checkRules(state);
        saveData(levels);
      }
      else {
        setTodayChecked(true);
      }

    }
    PushPole.initialize(false);
  },[])

  return(
      <>
        <SoundController/>
        {todayChecked?
        <Stack.Navigator headerMode="none" initialRouteName={bmi>0?'PageMain':'PageName'}>

          <Stack.Screen name="PageMain"
           component={PageMain} />
          <Stack.Screen name="PageName" component={PageName} />
          <Stack.Screen name="PageProperties" component={PageProperties} />
          <Stack.Screen name="PageFood"
                        options={{
                          gestureEnabled: true,
                          cardOverlayEnabled: true,
                          ...RightTransition ,
                        }}
                        component={PageFood} />
          <Stack.Screen name="PageFoodNeg"
                        options={{
                          gestureEnabled: true,
                          cardOverlayEnabled: true,
                          ...UpTransition ,
                        }}
                        component={PageFoodNeg} />
          <Stack.Screen name="PageActivity"
                        options={{
                          gestureEnabled: true,
                          cardOverlayEnabled: true,
                          ...LeftTransition ,
                        }}
                        component={PageActivity} />
          <Stack.Screen name="PageActivityHalf"
                        options={{
                          gestureEnabled: true,
                          cardOverlayEnabled: true,
                          ...UpTransition ,
                        }}
                        component={PageActivityHalf} />
          <Stack.Screen name="PageActivityNeg"
                        options={{
                          gestureEnabled: true,
                          cardOverlayEnabled: true,
                          ...UpTransition ,
                        }}
                        component={PageActivityNeg} />
        </Stack.Navigator>:
        <View style={{flex:1, backgroundColor: "#0f3648"}}/>}
      </>
  );
}
