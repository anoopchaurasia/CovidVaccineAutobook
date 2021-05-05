export default async function beneficiary(token){
  console.log('get benificiary')
    return fetch("https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Bearer "+token,
      "cache-control": "no-cache",
    },
    "referrer": "https://selfregistration.cowin.gov.in/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "method": "GET",
    "credentials": "include"
  }).then(x=>{
    console.log('got benificiary')
   return x.json().catch(err=>console.error(err))
  });
}