import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function pincodes() {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('pincodes').then(pincodes=>{
            set(pincodes|| "")
        })
    })
    return <View>
        <Text>Pincode</Text>
         <TextInput
        onChangeText={x=> {localStorage.save('pincodes', x), set(x)}}
        value={value}
        style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10,  minHeight:60, margin:10}}

        multiline={true}
        placeholder="pincodes"
        keyboardType="numeric"
      />
    </View>
}