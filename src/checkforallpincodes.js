import React from "react";
import centers from './api/centers';

export default async function run(pincodes, date, token, cb){
    let promises = [];
    for(let i =0; i<pincodes.length; i++){
        promises.push(centers(pincodes[i], date, token))
    }
    Promise.all(promises).then(values=>{
        Promise.all(values.filter(x=>x.ok).map(x=>x.json())).then(x=>{
            let centers = [];
            let data ={};
            x.forEach(s=> s.centers.forEach(x=> {if(data[x.center_id]) return; data[x.center_id]=1; centers.push(x)}));
            cb(centers);
        });
    })
}