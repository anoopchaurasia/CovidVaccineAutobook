import React, { useState } from 'react';
import captcha from '../api/captcha';
import { SvgXml } from 'react-native-svg';
import { View, TextInput, Button } from 'react-native';
import localStorage from 'react-native-local-storage';

export default function CaptchUI({callCaptch, onPress}){
    let [captch, setCaptch] = useState(null);
    let [txt, setText] = useState("");
    let [data, setData] = useState(null);
    callCaptch(async (token, d)=>{
        setData(d);
        await setCaptch11(token)
    })

    async function setCaptch11(token){
        token = await localStorage.get("token");
        console.log(token);
        let captch = await captcha(token);
        setCaptch(captch.captcha);
    }

    return data?<>
          <SvgXml 
          width="200"
          height="100" 
          xml={captch}/>
          <Button style={{width:30}} title="refresh" onPress={setCaptch11}/>
          <TextInput
        style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10, width:100}}
        value={txt}
          onChangeText={r=> setText(r)}
          />
          <Button title="Submit" onPress={x=>onPress(txt, data)} />
    </> : <View></View>

}