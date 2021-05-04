import React from 'react';
import SmsListener from 'react-native-android-sms-listener'
import { sha256 } from 'react-native-sha256';

import localStorage from 'react-native-local-storage'
import { PermissionsAndroid, Platform } from 'react-native'
import schedule from './api/schedule';
import pincodecheck from './checkforallpincodes';
import generateOTP from './api/generateOtp'
import validateOTP from './api/validateOTP';
import beneficiary from './api/benefeciary'
export default async function yyuyuyu(){
    let txn;
    requestReadSmsPermission();
    let tttt;
    SmsListener.addListener(message => {
        clearTimeout(tttt)
        tttt= setTimeout(z=>rrr(message), 500);
    });

    function rrr(message){
        if(!txn) return
        console.error(message.body.match(/ \d{6}\./)[0]);
        sha256(message.body.match(/ \d{6}\./)[0].trim().slice(0,6)).then( hash => {
            console.error(hash, txn, "validate");
            validateOTP(hash, txn).then(async x=> {
                await localStorage.save("token", x.token)
                console.log(x.token);
            });
        })
    }

    

    let pincodes = JSON.parse(await localStorage.get('pincodes'))||[ "560018"];;
    let duration = await localStorage.get('duration');
    let fromdate = await localStorage.get('fromdate');
    let minlength = ((await localStorage.get('minlength'))||2)*1;
    setInterval(x=>{
        pincodecheck(pincodes, fromdate || todayDate(), function(data){
            console.log(data, "45445");
            debugger
            data && data.centers &&
            data.centers.filter(center=> {
                center.sessions.filter(session=>{
                    console.log(session)
                    if(session.available_capacity>=minlength && session.min_age_limit<= 45) {
                        process(center, session, beneficiaries)
                    }
                }).length>0 })
        });
    }, duration||10*1000);

    function gOTP(){
        generateOTP("7760459008").then(x=>{
            txn = x.txnId;
            console.error(txn, "txn");
        });
    }

    async function reauth() {
        let token = await localStorage.get("token");
        console.error(token,"token7878")
        if(!token) {
           return gOTP();
        }
        beneficiary(token).then(x=>{
            if(!x || !x.beneficiaries) {
               return gOTP()
            }
            beneficiaries = x.beneficiaries.map(x=>x.beneficiary_reference_id)
            console.error(x.beneficiaries.map(x=>x.beneficiary_reference_id));
        }).catch(x=> gOTP());
    }

    setInterval(async x=>{
        reauth()
    } ,5.1*60*1000);
    reauth();
};

    async function requestReadSmsPermission() {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: "(...)",
              message: "Why you're asking for..."
            }
          );
        } catch (err) {}
      }
      
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
