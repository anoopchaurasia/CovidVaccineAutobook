import React from 'react';

export default function generateOTP(mobile){
    return fetch("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
        },
        "referrer": "https://selfregistration.cowin.gov.in/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": '{"secret":"U2FsdGVkX1/Au70IXHaYJwwjzcnH7omDLKmCZIyv4pWT7K9YutD3wR3Zqvp71LrBIgeeyEnM5qo7WOsckYY+SA==","mobile":'+mobile+'}',
        "method": "POST",
        "credentials": "omit"
        }).then(x=>x.json());
}
