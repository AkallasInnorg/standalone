import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import GoogleGantt from './googleGantt';
import MyCalendar from './calendar';
import PapaerCalendar from './paperDates';
import CustomHeader from './customHeaderPartial';
import ProvaCustomHeader from './provaCustomHeader';
import globalStyles from '../utils/globalStyles';
import Gantt from './defGoogleGant';
import DetailsCard from './detailCard';
import MyGantt from './gantt';
import TimeSheet from './timeSheet';


//NEW YORK
export default function Home() {
    const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
    var [period, setPeriod] = useState(periods[0]);
    var [count, setCount] = useState(0);
    var row = [];
    var rows = [];
    var dates = [];
    var arrayOfDates = [];
    var properties = [];
    var dets, detailsData;
    var per = ProvaCustomHeader

    function changePeriodRight() {
        if (count < 2) {
            count++
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        } else {
            count = 0;
            setCount(count);
            setPeriod(periods[count])
            // console.log(period)
        }
    }
    function changePeriodLeft() {
        if (count > 0) {
            count--
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        } else {
            count = 2
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        }
    }

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        console.log(`#${randomColor}`);
    };

    function generateDates(startDate, endDate) {
        const currentDate = new Date(startDate);
        const lastDate = new Date(endDate);

        if (currentDate > lastDate) {
            throw new Error("Starting date cannot be after the ending date.");
        }

        while (currentDate <= lastDate) {
            const dateString = currentDate.toISOString().split("T")[0];
            dates.push(dateString);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        arrayOfDates.push(dates);
        console.log(dates);
        console.log(arrayOfDates);
        return dates;
    }

    function arrayOfDatesFIller() {
        if (arrayOfDates < 1) {
            for (let row of rows) {
                dates = []
                generateDates(row[2], row[3])
            }
            return arrayOfDates;
        } else { arrayOfDates = [], arrayOfDatesFIller() }
    }

    function buildProperties(arrays, color) {
        properties = [];
        for (let array of arrays)
            for (let i = 0; i < array.length; i++) {
                const startingDay = i === 0;
                const endingDay = i === array.length - 1;

                // const property = {
                    // [array[i]]: {
                    properties[array[i]]= {
                        periods: [
                            {
                                startingDay: startingDay,
                                endingDay: endingDay,
                                color: color,
                            },
                        ],
                    };
                // };
                // console.log()
                // properties.push(property);
            }
        console.log(properties)
        // fill()
        // console.log(myList)
        return properties;
    }

    // var myList = Object.keys(properties).map(function(key){
    //     return {label: key, value: properties[key]}
    // });
    // var myList = [];
    // function fill() {
    //     myList = []
    //     Object.keys(properties).map(function (key) {
    //         myList.push(properties[key])
    //     });
    // }

    function getData() {
        axios.get('http://127.0.0.1:3000/get-data').
            then(
                function (res) {
                    // console.log(res.data);
                    dets = res.data;
                    if (rows.length < 2) {
                        for (var [key, value] of Object.entries(dets)) {
                            var start = new Date(value['dev_start']);
                            var end = new Date(value['planned_release']);
                            var dur = millscndToDays((end - start));
                            row.push(value['ticket']);
                            row.push(value['description']);
                            // row.push(new Date(value['dev_start']));
                            row.push(value['dev_start']);
                            // row.push(new Date(value['planned_release']));
                            row.push(value['planned_release']);
                            // row.push(null);
                            row.push(dur);
                            row.push(100);
                            row.push(null);
                            rows.push(row);
                            row = [];
                        }
                        console.log(rows);
                        console.log(dets);
                        return rows;
                    } else { rows = []; getData() }

                }
            ).then(() => { arrayOfDatesFIller() });
        // return rows
    }

    function detailsProvider(idx) {
        detailsData = dets[idx]
        console.log(JSON.stringify(detailsData))
        console.log(detailsData)
    }

    function millscndToDays(mlscd) {
        return mlscd / 1000 / 60 / 60 / 24;
    }


    const eventoClick =
        [{
            eventName: 'select',
            callback: async ({ chartWrapper, google }) => {
                const chart = await chartWrapper.getChart();
                const chart1 = await chartWrapper.getDataTable();
                const rowIndex = await chart.getSelection()[0]['row'];
                try {
                    await google.visualization.events.addListener(chart, "select", () => {
                        console.log("select: ", chart)
                        console.log('Index: ', rowIndex)
                        console.log("select: ", chart1)
                        detailsProvider(rowIndex);
                    })
                } catch (err) { console.log(err) }
            }
        }]


    useEffect(() => { getData(); }, [rows]);

    return (
        // <ScrollView>
        <View style={globalStyles().containerHome}>
            <Text
                style={globalStyles().provaText}
            >Open up App.js to start working on your app!</Text>
            <ProvaCustomHeader leftMethod={changePeriodLeft} rightMethod={changePeriodRight} period={period}/>
            <hr />
            <Button onPress={()=>console.log(per)}
            ><Text>Get Data</Text></Button>
            <Button
                onPress={() => buildProperties(arrayOfDates, 'plum')}
            ></Button>
            
            {/* {period == periods[2] ? <MyCalendar markedDates={{properties}} /> : <Text>Other stuff</Text>} */}
            <TimeSheet/>
        </View>
        // </ScrollView>
    );
}
