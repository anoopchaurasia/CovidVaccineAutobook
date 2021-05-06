fetch("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
   "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"

  },
  "referrer": "https://selfregistration.cowin.gov.in/",
  "body": "{\"secret\":\"U2FsdGVkX18SIURWRRWslUwX3OQf/8OafYHZYqud1uWkKDHSxj6rqfHV0Lsw0K77H6PinZdqBshqOEtoXWDNKA==\",\"mobile\":7760459008}",
  "method": "POST",
}).then(x=> console.log(x))

