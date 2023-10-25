import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

function TextCarousel(props) {
    const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
    var [period, setPeriod] = useState('');
    var [count, setCount] = useState(0);
    period = props ;
    // var count = 0
    function changePeriodRight() {
        if (count < 2) {
            count++
            setCount(count)
            setPeriod(periods[count])
            console.log(currPeriod)
        } else {
            count = 0;
            setCount(count);
            setPeriod(periods[count])
            console.log(currPeriod)
        }
    }
    function changePeriodLeft() {
        if (count > 0) {
            count--
            setCount(count)
            setPeriod(periods[count])
            console.log(currPeriod)
        } else { 
            count = 2 
            setCount(count)
            setPeriod(periods[count])
            console.log(currPeriod)
        }
    }

    return (
        <Card
            wrapperStyle={{
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center'
            }}
            containerStyle={{ borderRadius: 20, height: 50, width: 280 }}>
            <Ionicons name="chevron-back-outline" size={20} onPress={changePeriodLeft} />
            <Text style={{
                fontSize: 20, verticalAlign: 'middle',
                valueOf: periods[count]
            }}>{periods[count]}</Text>
            <Ionicons name="chevron-forward-outline" size={20} onPress={changePeriodRight} />
        </Card>
    )
}

export default TextCarousel;