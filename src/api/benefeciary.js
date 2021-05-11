export default async function beneficiary(token){
  console.log('get benificiary')
    return fetch("https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Bearer "+token,
      "cache-control": "no-cache",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
    },
    "referrer": "https://selfregistration.cowin.gov.in/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "method": "GET",
    "credentials": "include"
  }).then((x, err)=>{
    console.log('got benificiary', x.status)
    if(x.ok)
      return x.json().catch(err=>console.error(err))
  });
}