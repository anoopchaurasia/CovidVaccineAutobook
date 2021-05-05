import localStorage from 'react-native-local-storage';
import generateOTP from './../api/generateOtp'

export default function login(){
    localStorage.get("phonenumber").then((x="7760459008")=>{
        x = x||"7760459008"
        if(!x) return;
        if(x.length>10 || x.length<10 ) return;
        generateOTP(x).then({txnId}=>localStorage.save('txnId', txnId));
    });
}