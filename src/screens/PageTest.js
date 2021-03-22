import React, {useState, useEffect,useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import { Picker, DatePicker } from 'react-native-wheel-pick';

// Connction to access the pre-populated user_db.db
const db = openDatabase(
          {
            name: 'database.db',
            createFromLocation: 1
          },
          // ()=>console.log("Database Success"),
          // ()=>console.log("Daatbase Fail")
          );

async function dbTest()
{
  await db.transaction(tx => {
    tx.executeSql('SELECT * FROM bmi_boys WHERE Month=228', [], (tx, results) => {
      let data = results.rows.length;
      for (let i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i));                   //looping through each row in the table and storing it as object in the 'users' array
       }
    });
  });
}

export default function Screens(props) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    dbTest();
  },[]);

return(
  <View style={{backgroundColor: "#0ee",flex:1, flexDirection: 'row'}}>
    <Picker
      style={{ backgroundColor: "#0ee", width: 200, height: 215 }}
      selectedValue='item4'
      pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
      onValueChange={value => { }}
      itemSpace={30} // this only support in android
    />
    <Picker
      style={{ backgroundColor: "#0ee", width: 200, height: 215 }}
      selectedValue='item4'
      pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
      onValueChange={value => { }}
      itemSpace={30} // this only support in android
    />
  </View>
);
}
