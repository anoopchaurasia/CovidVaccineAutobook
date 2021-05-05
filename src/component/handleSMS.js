import {
    PermissionsAndroid
} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import { sha256 } from 'react-native-sha256';

letestTimestamp = null;
requestReadSmsPermission();
SmsListener.addListener(message => {
    if (!message.originatingAddress.match(/NHPSMS/) || !message.body.match(/CoWin/)) return;
    if(timestamp === letestTimestamp) return;
    letestTimestamp = timestamp;
    rrr(message.body.match(/ \d{6}\./)[0].trim().slice(0,6))
});
let otpHandler; 
export default function (fn) {
    otpHandler = fn;
}

function rrr(otp){
    if(!txn) return
    sha256(otp).then( hash => {
        otpHandler(hash);
    })
}

async function requestReadSmsPermission() {
    try {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS, {
                title: "(...)",
                message: "Why you're asking for..."
            }
        );
    } catch (err) {}
}