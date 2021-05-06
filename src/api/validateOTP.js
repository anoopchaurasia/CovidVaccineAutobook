export default function validateOTP(otp, txnId){
    return fetch("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
  },
  "referrer": "https://selfregistration.cowin.gov.in/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({otp, txnId}),
  "method": "POST",
  "credentials": "omit"
}).then(x=>{
  console.log('validate otp');

    if(x.status===200)
    return x.json()
    console.error(x, x.status, x.textMessage, otp, txnId)
}).catch(e=> console.error(e));
}