import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import GoogleGantt from './googleGantt';
import MyCalendar from './calendar';
import PapaerCalendar from './paperDates';
import CustomHeader from './customHeaderPartial';
import ProvaCustomHeader from './provaCustomHeader';
import globalStyles from '../utils/globalStyles';
import Gantt from './defGoogleGant';


//NEW YORK
export default function Home() {
    const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
    var [period, setPeriod] = useState(periods[0]);
    var [count, setCount] = useState(0);
    const det = ProvaCustomHeader().key;

    function getData (){
        axios.get('http://127.0.0.1:3000/get-data').
        then(function (res){console.log(res)})
    }

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
        <ScrollView style={globalStyles().prova}>
            <View style={styles.container}>
                <Text
                style={globalStyles().provaText}
                >Open up App.js to start working on your app!</Text>
                {/* <Text>{period === periods[1] ? `questa è ${period}` : `questo è ${period}`}</Text>
                <Button onPress={() => console.log(period)} />
                <CustomHeader
                    period={period}
                    leftFunction={changePeriodLeft}
                    rightFunction={changePeriodRight}
                    frase={period === periods[1] ? `questa è` : `questo è`} /> */}
                <Button onPress={() => console.log(det)} />
                <hr />
                <Button onPress={getData}
                >Get Data</Button>
                <hr />
                <ProvaCustomHeader />
                <Gantt/>
                <hr />
                <MyCalendar />
                <hr />
                <PapaerCalendar />
                {/* <GoogleGantt /> */}
            </View></ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
