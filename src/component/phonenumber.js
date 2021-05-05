import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function phonenumber() {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('phonenumber').then(phonenumber=>{
            set(phonenumber|| "")
        })
    })
    return <View>
         <TextInput
        onChangeText={x=> {localStorage.save('phonenumber', x), set(x)}}
        value={value}
        placeholder="phonenumber"
        keyboardType="numeric"
      />
    </View>
}