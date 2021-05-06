import React from 'react';

export default function generateOTP(mobile) {
    return fetch("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP", {
        "headers": {
          "content-type": "application/json",
          "pragma": "no-cache",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
         
        },
        "referrer": "https://selfregistration.cowin.gov.in/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"secret\":\"U2FsdGVkX1+e12Snj4fQSPX6cOmrVoY81plN+8L4JYwI8ZE1EJ2Td2lmaEFsTIgjJ+La+ZreoyZRfD1nXqL1Rg==\",\"mobile\":7760459008}",
        "method": "POST",
      }).then(x => {
        if(x.ok)
            return x.json().catch(err => console.error(err))
        console.log('generate otp');

    });
}

//secret: "U2FsdGVkX1+e12Snj4fQSPX6cOmrVoY81plN+8L4JYwI8ZE1EJ2Td2lmaEFsTIgjJ+La+ZreoyZRfD1nXqL1Rg=="



