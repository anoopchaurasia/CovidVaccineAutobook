import React,{useState, useEffect} from 'react';


import localStorage from 'react-native-local-storage'
import schedule from './api/schedule';
import pincodecheck from './checkforallpincodes';
import validateOTP from './api/validateOTP';
import beneficiary from './api/benefeciary'
import PincodeView from './component/pincodes'
import FromDateView from './component/fromdate'
import DurationView from './component/duration'
import Login from './component/login'
import handleSMS from './component/handleSMS';
import PhoneNumberView from './component/phonenumber'

export default function Index(){
    handleSMS(async otphash=>{
        completed=true;
        validateOTP(otphash, await localStorage.get('txnId')).then(async x=> {
            await localStorage.save("token", x.token)
        }).catch(x=> console.error(e));
    })
 
    let beneficiaries, completed = true;
    function getBenficiries(){
        if(!completed) return;
        completed=false;
        setTimeout(x=>completed=true, 1*60*1000);
        localStorage.get('token').then(token=>{
            if(!token){
                 return Login();
            }
            beneficiary(token).then(x=>{
                if(!x || !x.beneficiaries) {
                    return Login()
                }
                beneficiaries = x.beneficiaries.map(x=>x.beneficiary_reference_id)

            }).catch(x=> Login());
        })
    }
    setInterval(async x=>{
        getBenficiries()
    } ,5.1*60*1000);
    const callme = async x=>{
        let pincodes =( await localStorage.get('pincodes')).split(",");
        let fromdate = await localStorage.get('fromdate');
        
        if(!beneficiaries) return getBenficiries();
        pincodecheck(pincodes, fromdate, function(data){
            if(!x) return
            data && data.centers &&
            data.centers.filter(center=> {
                center.sessions.filter(session=>{
                    if(session.available_capacity>=beneficiaries.length && session.min_age_limit<= 45) {
                        process(center, session, beneficiaries)
                    }
                }).length>0 })
        });
    };

    return <>
        <PhoneNumberView />
        <PincodeView />
        <DurationView callme={callme} />
        <FromDateView />
     </>
};

let inprocess = false;
async function process(center, session, beneficiaries) {
    let token = await localStorage.get("token");

    inprocess = true
    let data = {
        center_id: center.center_id,
        session_id: session.session_id,
        dose: 1,
        slot: session.slots[session.slots.length - 1],
        beneficiaries: beneficiaries
      }
      schedule(data, token).then(x=> {console.log(x); inprocess=false}).catch(e=>{
        inprocess=false;
        console.error(e)
    });
      console.error(data)
    return true;
}


//      <service android:name="com.covidvaccineautobook.setInetrvalTaskService" />
