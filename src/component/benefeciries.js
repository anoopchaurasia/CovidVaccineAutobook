
import React, { useState } from "react";
import {View, Text} from "react-native";

export default function Ben({setter}){
    let [beneficiariesnames, set] = useState([]);
    setter(x=>{
        set(x);
    })
    return <View>
            {(beneficiariesnames||[]).map(x=><Text key={x}>{x}</Text>)}
    </View>
}