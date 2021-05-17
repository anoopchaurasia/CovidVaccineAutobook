import React, { } from 'react';
let logg = console.log;
console.log = function () {
    logg("1655", ...arguments);
}

import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';
import {View, PermissionsAndroid, Picker, NativeModules, Text } from 'react-native';
import SessionView from "./component/sessions";
import localStorage from 'react-native-local-storage'
import schedule from './api/schedule';
import validateOTP from './api/validateOTP';
import beneficiary from './api/benefeciary'
import PincodeView from './component/pincodes'
import FromDateView from './component/fromdate'
import DurationView from './component/duration'
import Login from './component/login'
import handleSMS from './component/handleSMS';
import PhoneNumberView from './component/phonenumber'
import BackgroundTimer from 'react-native-background-timer';
import CaptchUI from './component/fixcaptch';
import Beneficiries from "./component/benefeciries";

let sound ;
export default function Index() {
    NotificationSounds.getNotifications('notification').then(soundsList  => {
       sound = soundsList[16];
    });
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
            title: 'Please give SMS read permission',
            message: 'app will read otp from cowin',
        },
    );

    RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then((isEnabled) => {
        if (isEnabled) {
            RNDisableBatteryOptimizationsAndroid.openBatteryModal();
        }
    });
    handleSMS(async otphash => {
        validateOTP(otphash, await localStorage.get('txnId')).then(async x => {
            console.log("got token")
            await localStorage.save("token", x.token)
        }).catch(x => console.error(e));
    })
    BackgroundTimer.start();
    let beneficiaries, beneficiariesnames;
    function getBenficiries() {
        console.log("get ben")
        localStorage.get('token').then(token => {
            if (!token) {
                return Login();
            }
            beneficiary(token).then(x => {
                if (!x || !x.beneficiaries) {
                    return Login()
                }
                //
                beneficiaries = x.beneficiaries.filter(x => !x.dose1_date).map(x => x.beneficiary_reference_id)
                setBenef(x.beneficiaries.filter(x => !x.dose1_date).map(x => x.name));

            }).catch(x => Login());
        })
    }
    let callONAvailibity;
    let done = false;
    let counter = 0;
    let tetetet;
    const callme = async x => {
        if ((beneficiaries && beneficiaries.length == 0) || done) return console.log("no beneficiries ", beneficiaries);
        console.log("callme", new Date(), counter, beneficiaries && beneficiaries.length || "none");

        localStorage.get("timer").then(d=>{
            if (d*counter >= 600) {
                counter = 0;
                console.log("relogin");
                Login();
            }
        })
        counter++;
        if (!beneficiaries) return getBenficiries();
        checkSlot(beneficiaries);
    };
    let checkSlot;
    function cb_for_slot_check(cb) {
        checkSlot = cb;
    }

    async function callCaptch(cb) {
        callONAvailibity = cb;
    }

    function onPress(captcha, data) {
        localStorage.get("selected_session").then(data => {
            data = JSON.parse(data);
            process(data.center, data.session, data.beneficiaries, data.token, captcha);
        })
        clearInterval(tetetet);
    }

    function onDataAvail() {
        callONAvailibity({});
        BackgroundTimer.stop();
        done = true;
        playsound();
        tetetet = setInterval(x => {
            playsound()
        }, 6000);
    }
    let setBenef;
    function setVen(cb){
        setBenef=cb;
    }

    return <View>
        <Beneficiries setter={setVen}/>
        <SessionView onDataAvail={onDataAvail} checkslotsCB={cb_for_slot_check} />
        <CaptchUI onPress={onPress} callCaptch={callCaptch} />
        <PhoneNumberView />
        <PincodeView />
        <DurationView callme={callme} />
        <FromDateView />
    </View>
};

function playsound() {
    playSampleSound(sound);
}


let inprocess = false;
async function process(center, session, beneficiaries, token, captch) {
    playsound();
    inprocess = true;
    console.log(captch, "--------------------------");

    let data = {
        captcha: captch,
        center_id: center.center_id,
        session_id: session.session_id,
        dose: 1,
        slot: session.slots[0],
        beneficiaries: beneficiaries
    }
    schedule(data, token).then(x => {
        if (!x.ok) {
            localStorage.save('err', x.status + x.text)
        }
        console.error(x);
        playsound();
        inprocess = false
    }).catch(e => {
        inprocess = false;
        console.error(e)
    });
    console.error(data)
    return true;
}
