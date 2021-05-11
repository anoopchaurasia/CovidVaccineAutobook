import React, { useState } from 'react';
import captcha from '../api/captcha';
import { SvgXml } from 'react-native-svg';
import { View, TextInput, Button, Text } from 'react-native';
import localStorage from 'react-native-local-storage';

export default function CaptchUI({ callCaptch, onPress }) {
    let [captch, setCaptch] = useState(null);
    let [txt, setText] = useState("");
    let [data, setData] = useState();
    callCaptch(async (token, d) => {
        setData(d);
        await setCaptch11(token)
    });

    async function setCaptch11(token) {
        token = await localStorage.get("token");
        console.log(token);
        let captch = await captcha(token);
        setCaptch(captch.captcha);
    }

    return <View style={{ margin: 10, borderWidth: 1, borderColor: "#dddddd", padding: 10 }}>
    {data ? <>
        <Text style={{color:"#ccccc"}}>Captcha:</Text>
        <View style={{flexDirection:"row", height:110}}>
            <View style={{flex:3}}>
                <SvgXml
                    width="200"
                    height="100"
                    style={{}}
                    xml={captch} />
            </View>
            <View style={{flex:1}}>

                <Button style={{ width: 30}} title="refresh" onPress={setCaptch11} />
            </View>
        </View>
        <View style={{flexDirection:"row"}}> 
            <TextInput
                style={{ borderColor: "black", flex:2, borderWidth: 1, marginTop: 10, marginBottom: 10}}
                value={txt}
                placeholder="enter captch text and submit"
                onChangeText={r => setText(r)}
            />
            <View style={{flex:1, paddingTop:10}}>
                <Button title="Submit"  color="green" onPress={x => onPress(txt, data)} />
            </View>
        </View>
    </> : <View></View>}
        </View>
}