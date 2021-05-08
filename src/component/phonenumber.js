import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function phonenumber() {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('phonenumber').then(phonenumber=>{
            set(phonenumber|| "")
        })
    })
    return <View>
        <Text >Phone Number</Text>
         <TextInput
        onChangeText={x=> {localStorage.save('phonenumber', x), set(x)}}
        value={value}
        style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10}}

        placeholder="phonenumber"
        keyboardType="numeric"
        dataDetectorTypes="phoneNumber"
      />
    </View>
}