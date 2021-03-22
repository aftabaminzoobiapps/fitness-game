
import moment from "moment-jalaali";

export const Foods1=new Array(
                              { id:0, type: 1, subType: 1, name: "میوه ها",subName: "سیب و پرتقال و ...", icon: require('../../assets/images/food1/fruit.png'), units:[{name: "سیب، پرتقال، لیمو، هلو", value: "1 عدد"}, {name: "موز", value: "1 عدد کوچک"}, {name: "نارنگی، خرمالو، انجیر", value: "2 عدد"},  {name: "انگور و انار", value: "نصف لیوان"}, {name: "هندوانه، خربزه، طالبی", value: "1 لیوان"}, {name: "آبمیوه", value: "سه چهارم لیوان"}, ]},
                              { id:1, type: 1, subType: 1, name: "لبنیات کم چرب",subName: "شیر، ماست و ...", icon: require('../../assets/images/food1/milk.png'), units:[{name: "شیر", value: "1 لیوان"},{name: "ماست", value: "سه چهارم لیوان"}, {name: "دوغ", value: "2 لیوان"}, {name: "بستنی", value: "نصف لیوان"}]},
							  { id:2, type: 1, subType: 1, name: "صیفی جات",subName: "خیار، کلم و...", icon: require('../../assets/images/food1/vegetable.png') , units:[{name: "سبزی خام", value: "1 لیوان"},]},
							  { id:3, type: 1, subType: 1, name: "نان و غلات",subName: "گندم، برنج و ...", icon: require('../../assets/images/food1/wheat.png'), units:[{name: "نان لواش", value: "4 کف دست"},{name: "سنگک، بربری، تافتون", value: "1 کف دست"},{name: "برنج پخته", value: "نصف کفگیر پر"},{name: "ماکارونی پخته", value: "4 قاشق غذاخوری"}, {name: "سیب زمینی پخته", value: "6 عدد"}, {name: "بیسکوییت ساده", value: "3 عدد"}, {name: "ذرت بو داده، پفیلا بدون روغن", value: "3 لیوان"},]},
							  { id:4, type: 1, subType: 1, name: "گوشت و حبوبات",subName: "مرغ، ماهی، لوبیا و...", icon: require('../../assets/images/food1/meal.png'), units:[{name: "انواع گوشت قرمز، مرغ، ماهی و میگو ", value: "به اندازه 1 قوطی کبریت"},{name: "پنیر", value: "1 قوطی کبریت"}, {name: "تخم مرغ", value: "1 عدد"}, {name: "حبوبات", value: "نصف لیوان"}, {name: "انواع مغزها (گردو، بادام، و ...)", value: "یک سوم لیوان"}]},
                            );

export const Foods2=new Array(
                              { id:0, type: 1, subType: 3, name: "نوشابه ها",subName: "نوشیدنی شیرین و گازدار", icon: require('../../assets/images/food2/soda.png')},
                              { id:1, type: 1, subType: 3, name: "فست فود",subName: "ساندویچ، پیتزا و ...", icon: require('../../assets/images/food2/sandwich.png')},
							  { id:2, type: 1, subType: 3, name: "آبمیوه صنعتی",subName: "آبمیوه های پاکتی، رانی و ...", icon: require('../../assets/images/food2/juic.png')},
							  { id:3, type: 1, subType: 3, name: "تنقلات",subName: "لواشک، بستنی، کیک و ...", icon: require('../../assets/images/food2/ice.png')},
							  { id:4, type: 1, subType: 3, name: "پرچرب",subName: "سیب زمینی سرخ شده و ...", icon: require('../../assets/images/food2/chicken.png')},
                            );

// age0: 6-11, age1: 12-18
const Food1Needs = new Array(
  {id:0 , age: 0, min:2, max: 3 },
  {id:0 , age: 1, min:3, max: 4 },
  {id:1 , age: 0, min:2, max: 3 },
  {id:1 , age: 1, min:3, max: 3 },
  {id:2 , age: 0, min:3, max: 5 },
  {id:2 , age: 1, min:3, max: 5 },
  {id:3 , age: 0, min:6, max: 11 },
  {id:3 , age: 1, min:9, max: 11 },
  {id:4 , age: 0, min:2, max: 3 },
  {id:4 , age: 1, min:3, max: 3 },
);

export function FoodNeeds (bYear,bmiRange){
  let year = moment().jYear();
  let needs = Food1Needs.map(a => ({...a}));
  return needs.filter((item)=>{if((year-bYear)<12) return item.age==0; else  return item.age==1;})
        .map((item)=> {if(bmiRange<2) {item.min=item.max;} else if(bmiRange>3 && (item.id==3 || item.id==4)) {item.max=item.min;} else if(bmiRange>3 && item.id==2) {item.min=1;item.max=100;}else if(bmiRange>3 && item.id==0) {item.max=4;}  return item;});
}
