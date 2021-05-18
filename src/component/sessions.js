import React, { useEffect, useState} from 'react';
import pincodecheck from '../checkforallpincodes';
import District from '../api/district'
import localStorage from 'react-native-local-storage';
import {View, Picker} from "react-native";

export default function Sessions({checkslotsCB, onDataAvail}){
    let [availablecenters, setCenters] = useState([]);
 checkslotsCB(async (beneficiaries)=>{
    let fromdate = await localStorage.get('fromdate');
    let pincodes = (await localStorage.get('pincodes')).split(",").map(x => parseInt(x.trim())).filter(x => (x + "").length == 6);
    let token = await localStorage.get("token");
    let location = await localStorage.get("location");
    if (location == "pincodes") {
        pincodecheck(pincodes, fromdate, token, checkslots);
    } else {
        District(await localStorage.get("districtid"), fromdate, token).then(x => checkslots(x.centers || []))
    }
    async function checkslots(centers) {
        console.log(centers.length);
        centers.sort((a, b) => {
            return pincodes.includes(a.pincode) ? -1 : 1;
        });
        let validList = [];
        centers.filter(center => {
            center.sessions.forEach(session => {
                if (session.available_capacity_dose1 >= beneficiaries.length && session.min_age_limit < 45) {
                    validList.push({ session, token, beneficiaries, center })
                    console.log(session.date, center.pincode, center.name, session.available_capacity, "founddata");
                }
            })
        });
        if (validList.length > 0) {
            onDataAvail();
            localStorage.save("selected_session", JSON.stringify(validList[0]));
        }
        setCenters(validList);
    }
 })
    

     return  <View>
     <Picker
         style={{ height: 50, width: 150 }}
         onValueChange={(itemValue) => {console.log(itemValue, "settingdfd"); localStorage.save("selected_session", JSON.stringify(availablecenters.find(x=>x.session.session_id==itemValue)))}}>
         {availablecenters.map(item => <Picker.Item key={item.session.session_id} label={item.center.pincode + item.center.name +  item.session.available_capacity_dose1  + item.session.date} value={item.session.session_id} /> )}
     </Picker>
 </View>
}