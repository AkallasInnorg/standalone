import React, { useState } from 'react';
import { Text, View } from 'react-native';

import TextCarouselClass from './classTextCarousel';

export default function ProvaCustomHeader() {
    const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
    var [period, setPeriod] = useState(periods[0]);
    var [count, setCount] = useState(0);

    function changePeriodRight() {
        if (count < 2) {
            count++
            setCount(count)
            setPeriod(periods[count])
            console.log(period)
        } else {
            count = 0;
            setCount(count);
            setPeriod(periods[count])
            console.log(period)
        }
    }
    function changePeriodLeft() {
        if (count > 0) {
            count--
            setCount(count)
            setPeriod(periods[count])
            console.log(period)
        } else {
            count = 2
            setCount(count)
            setPeriod(periods[count])
            console.log(period)
        }
    }
    return (
        <View style={{ flexDirection: 'row', zIndex: 4, width: '50%' }}>
            <Text style={{ fontSize: '200%', marginLeft: '2%', marginTop: '3%' }}>
                Ciao </Text><Text style={{
                    color: '#E8A383', fontSize: '200%',
                    marginTop: '3%',
                    marginLeft: '1%'
                }}>Amir</Text>
            <Text
                style={{ fontSize: '200%', marginLeft: '2%', marginTop: '3%' }}>
                {period === periods[1] ? `questa è` : `questo è` }</Text>
            <View style={{ width: '30%', zIndex: 4 }}>
                <TextCarouselClass
                    period={period}
                    leftFunction={changePeriodLeft}
                    rightFunction={changePeriodRight}/>
            </View>
        </View>
    )
}