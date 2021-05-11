import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import localStorage from 'react-native-local-storage'
import DatePicker from 'react-native-datepicker'

export default function fromDate({ callme }) {
    let [value, set] = useState(null);
    localStorage.get('fromdate').then((fromDate = todayDate()) => {
        if(!fromDate) {
            fromDate = todayDate()
            localStorage.save('fromdate', fromDate)
        }
        if (reverseString(fromDate) < reverseString(todayDate())) {
            fromDate = todayDate();
        }
        localStorage.save('fromdate', fromDate);
        set(fromDate);
    })
    return <View style={{ margin: 10, borderWidth: 1, borderColor: "#dddddd", padding: 10 }}>
        <Text>
            From Date:
        </Text>
        <DatePicker
            style={{ width: 200 }}
            date={value}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate={todayDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { localStorage.save('fromdate', date), set(date) }}
        />
    </View>
}


function todayDate() {
    let date = new Date()
    return two(date.getDate()) + "-" + two(date.getMonth() + 1) + "-" + date.getFullYear();
}

function reverseString(str) {
    return str.split("-").reverse().join("-")
}

function two(k) {
    return ("0" + k).slice(-2);
}