import moment from "moment-jalaali";
import {TasksData} from '../data/tasks.js';
import {FoodNeeds} from '../data/foods.js';
export const todayDays = () =>
{
  return Math.floor(moment().valueOf()/8.64e7);
}

export const weekDay = () =>
{
  let day = moment().isoWeekday();
  if(day==6)
    day=1;
  else if(day==7)
    day=2;
  else {
    day=day+2;
  }
  return day;
}
export const checkRules = (state) =>
{
  let bmiRange=state.user.bmiRange;  //0: very Thin, 1: Thin, 2: Normal 3: Fat, 4: Very Fat
  let bYear = state.user.bYear;
                                  //(accumulator, currentValue)
  let totalFood = state.data.food1.reduce((a,b)=>a+b)+state.data.food2.reduce((a,b)=>a+b);
  let goodFood = state.data.food1.reduce((a,b)=>a+b);
  let badFood = state.data.food2.reduce((a,b)=>a+b);
  let highActivity = state.data.active1.reduce((a,b)=>a+b);
  let lowActivity = state.data.active2.reduce((a,b)=>a+b);
  let badActivity = state.data.active3.reduce((a,b)=>a+b);

  let levelFood=0;
  let levelActivity=0;
  let tipFood="";
  let tipActivity="";

  const Needs = FoodNeeds(bYear, bmiRange);

  if(totalFood==0)
  {
    levelFood=0;
    tipFood="واحدهای غذایی امروز رو ثبت نکردی";
  }
  else
  {
      if(badFood==0)
      {
        let notEat=Needs.reduce((acc,value,index)=>{
          if(state.data.food1[index]>=value.min && state.data.food1[index]<=value.max)
            return acc;
          else
            return acc=acc+1;},
        0);


        let badEat=Needs.reduce((acc,value,index)=>{
          if(state.data.food1[index]>value.max)
            return acc=acc+1;
          else
            return acc;},
        0);

        if(badEat>0)
        {
          levelFood=1;
          tipFood=`${badEat} نوع غذای سالم بیشتر از نیاز روزانه مصرف کردی`;
        }
        else if(notEat>0)
        {
          levelFood=2;
          tipFood=`${notEat} نوع غذای سالم به اندازه نیاز روزانه مصرف نکردی`;
        }
        else {
          levelFood=3;
          tipFood="";
        }

      }
      else {
        if(bmiRange<3)
        {
          if(badFood==1)
          {
              levelFood=2;
              tipFood=`${badFood} وعده غذایی ناسالم داری`;

          }
          else if(badFood==2){
            levelFood=2;
            tipFood=`${badFood} وعده غذایی ناسالم داری`
          }
          else {
            levelFood=1;
            tipFood=`${badFood} وعده غذایی ناسالم داری`
          }
        }
        else {
          if(badFood==1)
          {
            levelFood=2;
            tipFood=`${badFood} وعده غذایی ناسالم داری`
          }
          else {
            levelFood=1;
            tipFood=`${badFood} وعده غذایی ناسالم داری`
          }
        }
        if(state.data.food2[1]!=0)
        {
          levelFood=1;
          tipFood=`بهتره فست فودها رو کمتر مصرف کنی`;
        }

      }
  }


  let totalActive=highActivity*2+lowActivity-badActivity;

  if(bmiRange<3)
  {
    if(highActivity>=30 && lowActivity>=60)
    {
      if(badActivity<120)
      {
        levelActivity=3;
        tipActivity=""
      }
      else {
        levelActivity=2;
        tipActivity="باید عادت رفتاری غیر فعال رو به کمتر از 2 ساعت برسونی"
      }
    }
    else {
      if(badActivity<120)
      {
        if(lowActivity<60)
        {
          levelActivity=2;
          tipActivity="باید روزانه 60 دقیقه عادت رفتاری نیمه فعال داشته باشی"
        }
        else {
          levelActivity=2;
          tipActivity="روزانه 30 دقیقه عادت رفتاری فعال نیاز داری"
        }
      }
      else {
        levelActivity=1;
        tipActivity="باید عادت رفتاری غیر فعال رو به کمتر از 2 ساعت برسونی"
      }
    }
  }
  else {
    if(highActivity>=30 && lowActivity>=60)
    {
      if(badActivity<60)
      {
        if(badActivity<30)
        {
          levelActivity=3;
          tipActivity=""
        }
        else {
          levelActivity=2;
          tipActivity="عادت رفتاری غیر فعال رو باید کم کنی";
        }
      }
      else {
        levelActivity=1;
        tipActivity="باید عادت رفتاری غیر فعال رو به کمتر از 1 ساعت برسونی"
      }
    }
    else {
      if(badActivity<60)
      {
        if(lowActivity<60)
        {
          levelActivity=1;
          tipActivity="روزانه باید 60 دقیقه عادت رفتاری نیمه فعال داشته باشی"
        }
        else {
          levelActivity=1;
          tipActivity="روزانه 30 دقیقه عادت رفتاری فعال نیاز داری"
        }
      }
      else {
        levelActivity=1;
        tipActivity="باید عادت رفتاری غیر فعال رو به کمتر از 1 ساعت برسونی"
      }
    }
  }
  if(highActivity+lowActivity==0 && badActivity==0)
  {
    if(totalFood==0)
    {
      levelActivity=0;
      tipActivity="فعالیت امروز رو ثبت نکردی";
    }
    else {
      if(bmiRange<3)
      {
        levelActivity=2;
        tipActivity= "روزانه 30 دقیقه عادت رفتاری فعال نیاز داری"
      }
      else {
        levelActivity=1;
        tipActivity="روزانه باید 30 دقیقه عادت رفتاری فعال داشته باشی"
      }
    }
  }
  return {levelFood:levelFood, tipFood:tipFood, levelActivity:levelActivity, tipActivity:tipActivity};

}

export const checkTasksData = (state, values,  SliceStart, SliceEnd) =>
{
  let bmiRange=state.user.bmiRange;  //0: very Thin, 1: Thin, 2: Normal 3: Fat, 4: Very Fat
  let bYear = state.user.bYear;

  const Needs = FoodNeeds(bYear, bmiRange);

  let notEat=Needs.reduce((acc,value,index)=>{
    if(state.data.food1[index]>=value.min && state.data.food1[index]<=value.max)
      return acc;
    else
      return acc=acc+1;},
  0);
  console.log("notEat"+notEat);
  let temp=new Array(5).fill(false);

  if(notEat==0) temp[4]=true;

  TasksData.slice(SliceStart, SliceEnd).map((data,index) => {
    if(data.type==1)
    {
      if(values.levelFood>0)
      {
          if(data.subType==1)
          {
            if(state.data.food1[data.id]>=data.value)
               temp[index]=true;
             else
               temp[index]=false;
          }
          if(data.subType==3)
          {
            if(state.data.food2[data.id]<data.value)
               temp[index]=true;
             else
               temp[index]=false;
          }
      }
      else
        temp[index]=false;
    }
    if(data.type==2)
    {
      if(values.levelActivity>0)
      {
          if(data.subType==1)
          {
            if(state.data.active1[data.id]>=data.value)
               temp[index]=true;
             else
               temp[index]=false;
          }
          if(data.subType==2)
          {
            if(state.data.active2[data.id]>=data.value)
               temp[index]=true;
             else
               temp[index]=false;
          }
          if(data.subType==3)
          {
            if(state.data.active3[data.id]<data.value)
               temp[index]=true;
             else
               temp[index]=false;
          }
      }
      else
        temp[index]=false;
    }
  });

  // temp[0]=true;

  let total = 5-temp.reduce((a,b)=>{if(b)return a+1;else return a;},0);
  return  {ticks:temp, total:total};
}
