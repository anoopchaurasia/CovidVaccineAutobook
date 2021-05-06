import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage'

let clearIntervalV;
export default function fromDate({callme}) {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('fromdate').then((fromDate= todayDate())=>{
            fromDate = fromDate || todayDate();
            if(reverseString(fromDate)< reverseString(todayDate())) {
                fromDate = todayDate();
            }
            set(fromDate);
        })
    })
    return <View>
        <Text>
            From Date:
        </Text>
         <TextInput
        onChangeText={x=> {if(x<10000) return;localStorage.save('fromdate', x), set(x)}}
        value={value}
        placeholder="fromDate"
        keyboardType="numeric"
        dataDetectorTypes="calendarEvent"
      />
    </View>
}


function todayDate(){
    let date = new Date()
    return two(date.getDate())+"-"+two(date.getMonth()+1)+"-"+date.getFullYear();
}

function reverseString(str) {
    return str.split("-").reverse().join("-")
}

function two(k){
    return ("0"+k).slice(-2);
}