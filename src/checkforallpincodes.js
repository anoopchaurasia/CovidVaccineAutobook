import React from "react";
import centers from './api/centers';

export default async function run(pincodes, date, cb){
    for(let i =0; i<pincodes.length; i++){
        centers(pincodes[i], date).then(x=>cb(x)).catch(e=>console.error(e));
    }
}