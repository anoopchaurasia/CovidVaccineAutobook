import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function phonenumber({callme}) {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('phonenumber').then((phonenumber="10000")=>{
            phonenumber = phonenumber || "10000";
            set(phonenumber);
        })
    })
    return <View>
         <TextInput
        onChangeText={x=> {if(x<10000) return;localStorage.save('phonenumber', x), set(x)}}
        value={value}
        style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10}}

        placeholder="phonenumber"
        keyboardType="numeric"
      />
    </View>
}