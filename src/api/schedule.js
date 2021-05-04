export default async function schedule(data, token){
    console.error(data, token);
    return fetch("https://cdn-api.co-vin.in/api/v2/appointment/schedule", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer "+token,
    "cache-control": "no-cache",
    "content-type": "application/json"
  },
  "referrer": "https://selfregistration.cowin.gov.in/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify(data),
  "method": "POST",
  "credentials": "include"
}).then(x=>x.json());
}