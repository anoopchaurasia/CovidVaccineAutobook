import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import localStorage from 'react-native-local-storage'
import { RadioButton, Text } from 'react-native-paper';
export default function pincodes() {
    let [value, set] = useState(null);
    let [districtid, setDistrict] = useState(null);
    let [location, setLocation] = useState("pincodes");
    localStorage.get("districtid").then(x => setDistrict(x));
    localStorage.get("location").then(x => setLocation(x));
    localStorage.get("pincodes").then(x => set(x));
    return <View style={{ margin: 10, borderWidth: 1, borderColor: "#dddddd", padding: 10 }}>
        <RadioButton.Group onValueChange={newValue => { localStorage.save("location", newValue); setLocation(newValue) }} value={location}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text>Pincodes</Text>
                    <RadioButton value="pincodes" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text>District ID</Text>
                    <RadioButton value="second" />
                </View>
            </View>
        </RadioButton.Group>
        {location === "pincodes" ? <View style={{}}>
            <Text>Comma(,) separated pincodes</Text>
            <TextInput
                onChangeText={x => { localStorage.save('pincodes', x), set(x) }}
                value={value}
                style={{ padding: 10, borderColor: "black", borderWidth: 1, marginTop: 10, marginBottom: 10, minHeight: 60, margin: 10 }}

                multiline={true}
                placeholder="pincodes"
                keyboardType="numeric"
            />
        </View> : <View>
            <Text>District ID</Text>
            <TextInput
                onChangeText={x => { localStorage.save('districtid', x), setDistrict(x) }}
                value={districtid}
                style={{ padding: 10, borderColor: "black", borderWidth: 1, marginTop: 10, marginBottom: 10, margin: 10 }}
                placeholder="district id"
                keyboardType="numeric"
            />
        </View>}

    </View>
}