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
            localStorage.save('timer', timer);
            BackgroundTimer.clearInterval(clearIntervalV);
            console.log(timer*1)
            clearIntervalV = BackgroundTimer.setInterval(x=> {
                var a= 56;
                callme()
            }, timer *1000);
        })();
    })
    return <View style={{ margin: 10, borderWidth: 1, borderColor: "#dddddd", padding: 10 }}>
        <Text>Availability check frequency (seconds)</Text>
         <TextInput
         style={{borderColor:"black", padding:10, borderWidth:1, marginTop:10, marginBottom:10, width:100}}
        onChangeText={x=> {x = parseInt(x); if(!x || x<10) return; set((x))}}
        value={timer + ""}
        placeholder="timer"
        keyboardType="numeric"
      />
    </View>
}