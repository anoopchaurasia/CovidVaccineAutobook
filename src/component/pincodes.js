import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage'

export default function pincodes({setPincodes}) {
    let [value, set] = useState(null);
    useEffect(  x=>{
        localStorage.get('pincodes').then(pincodes=>{
            set(pincodes|| "")
            setPincodes(pincodes)
        })
    })
    return <View>
         <TextInput
        onChangeText={x=> {localStorage.save('pincodes', x), set(x)}}
        value={value}
        placeholder="pincodes"
        keyboardType="numeric"
      />
    </View>
}