import React,{useState, useEffect} from 'react';


import localStorage from 'react-native-local-storage'
import schedule from './api/schedule';
import pincodecheck from './checkforallpincodes';
import validateOTP from './api/validateOTP';
import beneficiary from './api/benefeciary'
import PincodeView from './component/pincodes'
import DurationView from './component/duration'
import pincodes from './component/pincodes';
import Login from './component/login'
import handleSMS from './component/handleSMS';

export default function yyuyuyu(){
    let fromdate //= await localStorage.get('fromdate');
    handleSMS(async await localStorage.get('txnId')l
        validateOTP(otphash, txnId).then(async x=> {
            await localStorage.save("token", x.token)
        })
    })
 
    Login();
    

    setInterval(async x=>{
        localStorage.get('token').then(token=>{
            if(!token) return Login();
            beneficiary(token).then(x=>{
                if(!x || !x.beneficiaries) {
                    return Login()
                }
                beneficiaries = x.beneficiaries.map(x=>x.beneficiary_reference_id)
            }).catch(x=> Login());
        })
        } ,5.1*60*1000);
    
    

    const setPincodes = x=> pincodes=x;
    const callme = x=>{
        console.info(Math.abs((Date.now() - date)/1000))
        pincodecheck(pincodes, fromdate || todayDate(), function(data){
            console.log(data, "45445");
          //  debugger
            data && data.centers &&
            data.centers.filter(center=> {
                center.sessions.filter(session=>{
                    console.log(session)
                    if(session.available_capacity>=minlength && session.min_age_limit<= 45) {
                        process(center, session, beneficiaries)
                    }
                }).length>0 })
        });
    };

   
    return <>
     <PincodeView setPincodes={setPincodes} />
     <DurationView callme={callme} />
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

function todayDate(){
    let date = new Date()
    return two(date.getDate())+"-"+two(date.getMonth()+1)+"-"+date.getFullYear();
}

function two(k){
    return ("0"+k).slice(-2);
}
