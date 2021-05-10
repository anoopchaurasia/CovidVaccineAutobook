import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import localStorage from 'react-native-local-storage';
import BackgroundTimer from 'react-native-background-timer';



let clearIntervalV, cleartimeoutL;
export default function timer({callme}) {
    let [timer, set] = useState("");
    useEffect(  x=>{
        (async function XX(){
            if(!timer) {
                timer = await localStorage.get('timer', timer) || "10";
                return set(timer);
            }
            localStorage.get('timer', timer);
            BackgroundTimer.clearInterval(clearIntervalV);
            console.log(timer*1)
            clearIntervalV = BackgroundTimer.setInterval(callme, timer *1000);
        })();
    })
    return <View>
        <Text>Availability check frequency (seconds)</Text>
         <TextInput
         style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10, width:100}}
        onChangeText={x=> {x = parseInt(x); if(!x || x<10) return; set((x))}}
        value={timer + ""}
        placeholder="timer"
        keyboardType="numeric"
      />
    </View>
}