// This script tries to automatically book a slot from the list of pincodes given.
// It will book the first available slot.
// You can get the beneficiary ID from your networks tab when the dashboard loads
// Please do change the date to which ever day you are searching for. (Works only for a few days in advance)

// Config
// ------

var pincodes = ["560076", "560078", "560062",  "560020", "560001", "560017", "560027", "560064", "560071", "560084"];
var beneficiaries = ["69288971892640", "89681074812470"];
var dateSelect = "04-05-2021";

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
   // console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}

let counter = 0
function fetchByPincode() {
    console.log("Fetching By Pin")
    
    for (let i=0;i < pincodes.length; i++) {
        url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincodes[i]+"&date="+dateSelect;
        a = httpGet(url);
        try {
          a = JSON.parse(a)
        } catch(e) {
          continue;
        }
        for (c in a.centers) {
        for (s in a.centers[c].sessions) {
              if (a.centers[c].sessions[s].min_age_limit < 45 && a.centers[c].sessions[s].available_capacity > 1) {
                console.log("Trying to Book for", a.centers[c].pincode, a.centers[c].name, a.centers[c].sessions[s].available_capacity);
                try{
                jQuery("[type='search']")[0].value = a.centers[c].pincode
               // jQuery(".pin-search-btn.md.button.button-solid.ion-activatable.ion-focusable.hydrated")[0].click()

                } catch(e){
                  console.error(e)
                }
                
                var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                audio.play();
                data = {
                  center_id: a.centers[c].center_id,
                  session_id: a.centers[c].sessions[s].session_id,
                  dose: 1,
                  slot: a.centers[c].sessions[s].slots[a.centers[c].sessions[s].slots.length - 1],
                  beneficiaries: beneficiaries
                }
                upload(data);
              }
          }
        }
     }
}

function upload(data) {
  console.log('upload start');
  return $.ajax({
      type: "POST",
      url: "https://cdn-api.co-vin.in/api/v2/appointment/schedule",
      data: data,
      success: function(result) {
        console.log('Dumping Result Log');
        console.log(result);
        console.log('Booking Success');
        clearInterval(timerClock);
      }
  });
}

clearInterval(window.timerClock);
window.timerClock = setInterval(fetchByPincode, 10000);

clearInterval(window.timerClock1);
window.timerClock1 = setInterval(x=>{
  jQuery(".not-now.back-arrow")[0].click()
  setTimeout(x=>{
    jQuery(".bordernone.ng-star-inserted").toArray().map(x=>x.childNodes[0].click());
    setTimeout(x=>{
      jQuery('.register-btn.schedule-appointment.md')[0].click()
    },100)
  }, 1000)
}, 5*60*1000)
