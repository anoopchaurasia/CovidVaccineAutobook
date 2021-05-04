export default function validateOTP(otp, txnId){
    return fetch("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
  },
  "referrer": "https://selfregistration.cowin.gov.in/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({otp, txnId}),
  "method": "POST",
  "credentials": "omit"
}).then(x=>{
    if(x.status===200)
    return x.json()
    console.error(x, x.status, x.textMessage, otp, txnId)
}).catch(e=> console.error(e));
}