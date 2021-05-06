import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage';
import BackgroundTimer from 'react-native-background-timer';


let clearIntervalV;
export default function timer({callme}) {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('timer').then((timer="10000")=>{
            timer = timer || "10000";
            set(timer);
            BackgroundTimer.clearInterval(clearIntervalV);
            console.log(timer*1)
            clearIntervalV = BackgroundTimer.setInterval(callme, timer *1);
        })
    })
    return <View>
        <Text>Availability check frequency</Text>
         <TextInput
        onChangeText={x=> {if(x<10000) return;localStorage.save('timer', x), set(x)}}
        value={value}
        placeholder="timer"
        keyboardType="numeric"
      />
    </View>
}