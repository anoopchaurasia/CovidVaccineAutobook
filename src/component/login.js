import localStorage from 'react-native-local-storage';
import generateOTP from './../api/generateOtp'

export default function login(cb){
    localStorage.get("phonenumber").then((x)=>{
        if(!x) return;
        if(x.length!=10) return;
        localStorage.remove('txnId');
        generateOTP(x).then(({txnId})=>{
            localStorage.save('txnId', txnId); cb && cb();
         } );
    });
}