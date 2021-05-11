import React, { useState, useEffect } from 'react';
let logg = console.log;
console.log = function () {
    logg("1655", ...arguments);
}

import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';
import { FlatList, View, Text, PermissionsAndroid, Picker } from 'react-native';

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
import BackgroundTimer from 'react-native-background-timer';
import District from './api/district'
import CaptchUI from './component/fixcaptch';
export default function Index() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'PLease give SMS read permission',
          message: 'app will read otp from cowin',
        },
      );
    let [availablecenters, setCenters] = useState([]);
    let [selected_session, setSelectedSession] = useState(null);
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
    let beneficiaries;
    function getBenficiries() {
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

            }).catch(x => Login());
        })
    }
    let callONAvailibity;
    let done = false;
    let counter = 0;
    let tetetet;
    let allprocesscompletd = true;
    const callme = async x => {
        if ((beneficiaries && beneficiaries.length == 0) || done) return console.log("no beneficiries ", beneficiaries);
        if (allprocesscompletd == false) return
        console.log("callme", new Date(), counter, beneficiaries && beneficiaries.length || 0);
        counter++;
        if (counter > 60) {
            counter = 0;
            console.log("relogin");
            Login();
        }
        if (!beneficiaries) if (counter % 10 == 1) return getBenficiries();
        if (!beneficiaries) return;
        let fromdate = await localStorage.get('fromdate');
        let pincodes = (await localStorage.get('pincodes')).split(",").map(x => parseInt(x.trim())).filter(x => (x + "").length == 6);
        let token = await localStorage.get("token");
        let location = await localStorage.get("location");
        if (location == "pincodes") {
            pincodecheck(pincodes, fromdate, token, checkslots);
        } else {
            District(await localStorage.get("districtid"), fromdate, token).then(x => checkslots(x.centers || []))
        }
        //  allprocesscompletd = false;
        async function checkslots(centers) {
            console.log(centers.length);
            centers.sort((a, b) => {
                return pincodes.includes(a.pincode) ? -1 : 1;
            });
            let validList = [];
            centers.filter(center => {
                center.sessions.forEach(session => {
                    if (session.available_capacity >= beneficiaries.length && session.min_age_limit < 45 && !done) {
                        validList.push({ session, token, beneficiaries, center })
                        console.log(session.date, center.pincode, center.name, session.available_capacity, "founddata");
                    }
                })
            });
            if (validList.length > 0) {
                playsound();
                BackgroundTimer.stop();
                done = true;
                tetetet = setInterval(x => {
                    playsound()
                }, 5 * 1000);
                callONAvailibity({});
            }
            setCenters(validList);
        }
    };


    async function callCaptch(cb) {
        callONAvailibity = cb;
    }

    function onPress(captcha, data) {
        let data = availablecenters.find(x => x.session.session_id == selected_session);
        process(data.center, data.session, data.beneficiaries, data.token, captcha);
        clearInterval(tetetet);

    }

    return <View>
        <View>
            <Picker
                selectedValue={selected_session}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedSession(itemValue)}
            >
                {availablecenters.map(item => <Picker.Item label={item.center.pincode | item.center.name | item.session.available_capacity | item.session.date} value={item.session.session_id} /> }
            </Picker>
        </View>
        <CaptchUI onPress={onPress} callCaptch={callCaptch} />
        <PhoneNumberView />
        <PincodeView />
        <DurationView callme={callme} />
        <FromDateView />
    </View>
};

function playsound() {
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback');
    var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        // Play the sound with an onEnd callback
        whoosh.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
        whoosh.setVolume(1);
    });
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
        console.log(x);
        playsound();
        inprocess = false
    }).catch(e => {
        inprocess = false;
        console.error(e)
    });
    console.error(data)
    return true;
}


//      <service android:name="com.covidvaccineautobook.setInetrvalTaskService" />
