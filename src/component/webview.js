
import React from 'react'
import WebView from 'react-native-webview';

let script = `
setTimeout(x=>{
  alert(typeof fetch);
fetch("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP", {
        "headers": {
          "content-type": "application/json"         
        },
        "body": '{"mobile":7760459008}',
        "method": "POST"
      }).then(x => {
        alert(x.status)
    });
  }, 3000)

`

export default function MyWebview(){
    return <WebView
    source={{ uri: 'https://selfregistration.cowin.gov.in/' }}
    injectedJavaScript={script}
                    javaScriptEnabled={true}
                    style={{ height: 200, width: 300, flex: 1, marginTop: 80 }}

  />
}