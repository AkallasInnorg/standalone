import React, { useEffect } from 'react';
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


//NEW YORK
export default function Home() {
    const {height, width} = useWindowDimensions();
    var row = [];
    var rows = [];
    var dets, detailsData;

    function getData() {
        axios.get('http://127.0.0.1:3000/get-data').
            then(
                function (res) {
                    // console.log(res.data);
                    dets = res.data;
                    if (rows.length < 2) {
                        for (var [key, value] of Object.entries(dets)) {
                            row.push(value['ticket']);
                            row.push(value['description']);
                            row.push(new Date(value['dev_start']));
                            row.push(new Date(value['planned_release']));
                            row.push(null);
                            row.push(100);
                            row.push(null);
                            rows.push(row);
                            row = [];
                        }
                        console.log(rows);
                        console.log(dets);
                    } else { rows = []; getData() }

                }
            );
        return rows
    }

    function detailsProvider (idx){
        // if (!idx){detailsData = dets['0']}
        detailsData = dets[idx]
        console.log(JSON.stringify(detailsData))
        console.log(detailsData)
    }

    function millscndToDays(mlscd){
        return mlscd / 1000 / 60 / 60 / 24;
    }

    function quantoManca (){
        // const start = new Date(8, 11, 2023);
        const start = new Date(2023, 11, 8);
        // const end = new Date(30, 11, 2023);
        const end = new Date(2023, 11, 30);
        const range = end-start;
        const days = millscndToDays(range);
        console.log(range);
        console.log(days);
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


    useEffect(() => { getData(); });
    // useEffect(() => { detailsProvider(); }, [detailsData])

    return (
        <ScrollView>
        <View style={globalStyles().containerHome}>
            {/* <Text
                style={globalStyles().provaText}
            >Open up App.js to start working on your app!</Text> */}
            <ProvaCustomHeader />
            <hr />
            <Button onPress={getData}
            ><Text>Get Data</Text></Button>
            <Button onPress={quantoManca}
            ></Button>
            <hr />
            {/* { !detailsData ? <Text>No details available</Text> :  */}
            <DetailsCard details={detailsData}/>
            {/* // } */}
            <hr />
            {!rows ? <Text>No Gantt available</Text> : <MyGantt rows={getData()}
                evento={eventoClick}
            />}
            {/* <MyGantt rows={getData()}
                evento={eventoClick}
            /> */}
            {/* <MyCalendar/> */}
        </View> </ScrollView>
    );
}

// const {height, width} = useWindowDimensions();
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: height
//     },
// });
