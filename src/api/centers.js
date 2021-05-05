
export default async function httpGet(pincode, date){
    url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincode+"&date="+date;
    return fetch(url,{
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
          },
          "referrer": "https://selfregistration.cowin.gov.in/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "credentials": "omit"
    }).then(async x=> {
        console.log(x.status, pincode, date)
        return x.json().catch(err=> console.error(err));
    })
}