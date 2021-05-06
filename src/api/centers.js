
export default async function httpGet(pincode, date){
    url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincode+"&date="+date;
    return fetch(url,{
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
          },
          "referrer": "https://selfregistration.cowin.gov.in/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "credentials": "omit"
    }).then(async x=> {
        console.log(x.status, pincode, date)
        if(x.ok)
        return x.json().catch(err=> console.error(err));
    })
}