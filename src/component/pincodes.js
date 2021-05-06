import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function pincodes() {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('pincodes').then(pincodes=>{
            set(pincodes|| "")
        })
    })
    return <View>
        <View>Pincode</View>
         <TextInput
        onChangeText={x=> {localStorage.save('pincodes', x), set(x)}}
        value={value}
        multiline={true}
        placeholder="pincodes"
        keyboardType="numeric"
      />
    </View>
}