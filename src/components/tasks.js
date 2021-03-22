import React, {useState, useEffect,useRef,forwardRef,useImperativeHandle } from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { userHonorToday } from '../actions/user/user_data';

import MailIcon from '../../assets/svg/mailIcon.svg';
import CircleTask from '../../assets/svg/circleTask.svg';

import { scale, ScaledSheet } from 'react-native-size-matters';
import Dialoge  from './Dialoge.js';
import DialogWin  from './DialogWin.js';

import {Foods1,Foods2} from '../data/foods.js';
import {Activity1,Activity2,Activity3} from '../data/activity.js';
import {TasksData} from '../data/tasks.js';

import ItemTask from '../components/itemsTask.js';
import {todayDays,checkTasksData} from '../data/checkRules.js';
import { soundMuteState, musicMuteState, soundPlay } from '../actions/sound/sound';

const TotalTask = Math.floor(TasksData.length/4);
const Today = todayDays();
const SliceStart = (Today%TotalTask)*4;
const SliceEnd = ((Today%TotalTask)+1)*4;

const Tasks = forwardRef((props, ref) => {

  useImperativeHandle(
      ref,
      () => ({
              checkTasks(state, values)
              {
                 let checkData= checkTasksData(state,values,SliceStart,SliceEnd);
                 let lastTotal=totalTask;
                 if(checkData.total==0 && values.levelFood==3 && values.levelActivity==3)
                 {
                   setMedal(true);
                   dispatch(userHonorToday(true));
                   if(!medal)toggleWinModal();
                 }
                 else {
                   setMedal(false);
                   dispatch(userHonorToday(false));
                   if(checkData.total==0 && lastTotal!=checkData.total)
                    dispatch(soundPlay('missionend'));
                 }

                 if(checkData.total>0 && lastTotal!=checkData.total)
                 {
                   if(numberRef.current)numberRef.current.animate("bounceIn");
                   // if(checkData.total==0)
                    dispatch(soundPlay('mission'));

                 }
                 setTotalTask(checkData.total);
                 setTicks(checkData.ticks);
                 // console.log(ticks);
              }
            }),
  )

  const [isModalVisible, setModalVisible] = useState(false);
  const [isWinVisible, setWinVisible] = useState(false);
  const [ticks,setTicks]=useState(new Array(5).fill(false));
  const [medal,setMedal]=useState(false);
  const [totalTask,setTotalTask]=useState(5);

  const dispatch = useDispatch();
  const numberRef = useRef();

  function foodList() {
      // type:1 food, 2:Activity
      // sign 0: green, 1:red

      return TasksData.slice(SliceStart, SliceEnd).map((data,index) => {
        if(data.type==1)
        {
          if(data.subType==1)
            return(
              <ItemTask key={index}
                        index={index}
                        count={data.value}
                        sign={0}
                        title={Foods1.find(item=>item.id==data.id).name}
                        name={data.name}
                        type={1}
                        icon={Foods1.find(item=>item.id==data.id).icon}
                        tick={ticks[index]}/>
            );
            if(data.subType==3)
              return(
                <ItemTask key={index}
                          index={index}
                          count={data.value}
                          sign={1}
                          title={Foods2.find(item=>item.id==data.id).name}
                          name={data.name}
                          type={1}
                          icon={Foods2.find(item=>item.id==data.id).icon}
                          tick={ticks[index]}/>
              );
        }
        if(data.type==2)
        {
          if(data.subType==1)
            return(
              <ItemTask key={index}
                        index={index}
                        count={data.value}
                        sign={0}
                        title={Activity1.find(item=>item.id==data.id).name}
                        name={data.name}
                        type={2}
                        icon={Activity1.find(item=>item.id==data.id).icon}
                        tick={ticks[index]}/>
            );
          if(data.subType==2)
            return(
              <ItemTask key={index}
                        index={index}
                        count={data.value}
                        sign={0}
                        title={Activity2.find(item=>item.id==data.id).name}
                        name={data.name}
                        type={2}
                        icon={Activity2.find(item=>item.id==data.id).icon}
                        tick={ticks[index]}/>
            );
          if(data.subType==3)
            return(
              <ItemTask key={index}
                        index={index}
                        count={data.value}
                        sign={1}
                        title={Activity3.find(item=>item.id==data.id).name}
                        name={data.name}
                        type={2}
                        icon={Activity3.find(item=>item.id==data.id).icon}
                        tick={ticks[index]}/>
            );
        }
      })
  }


  function toggleModal(){
    setModalVisible(!isModalVisible);
  }

  function toggleWinModal(){
    setWinVisible(!isWinVisible);
  }


  return(
    <>
      <Dialoge  isVisible={isModalVisible}
                toggleModal={toggleModal}>
                <ItemTask key={0}
                          index={0}
                          count={""}
                          sign={0}
                          title={"نیاز غذایی روزانه"}
                          name={"مصرف واحدهای غذایی امروز"}
                          type={1}
                          icon={require('../../assets/images/daily.png')}
                          tick={ticks[4]}/>
                {foodList()}
      </Dialoge>
      <DialogWin isVisible={isWinVisible}
                 toggleModal={toggleWinModal}/>
      <TouchableWithoutFeedback onPress={()=>{toggleModal()}}>

        <Animatable.View animation="bounceIn" delay={props.delay}>
          <MailIcon width={scale(70)} height={scale(70)} />
          {totalTask!=0?
          <Animatable.View  animation="bounceIn" delay={props.delay+400} ref={numberRef} style={{position: 'absolute'}}>
            <CircleTask width={scale(35)} height={scale(35)} style={{position: 'absolute'}}/>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{totalTask.toString()}</Text>
            </View>
          </Animatable.View>:
          <Image resizeMode= 'stretch' style={{position: 'absolute', height: scale(40), width: scale(40)}} source={medal? require('../../assets/images/medal.png'):require('../../assets/images/Mission_complete.png')}/> }
        </Animatable.View>
        </TouchableWithoutFeedback>
    </>
  );
})

const styles = ScaledSheet.create({
  countContainer:{
    position: 'absolute',
    height: '30@s',
    width: '30@s',
    marginTop: '2@s',
    marginLeft: '2@s',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: "Yekan",
    fontSize: '20@s',
    textAlign:'center',
    color: "#fff",
    marginTop: '-2@s'
  },
});


export default Tasks;
