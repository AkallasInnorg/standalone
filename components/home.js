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
import DetailsCard from './detailCard';
import MyGantt from './gantt';


//NEW YORK
export default function Home() {
    var row = [];
    var rows = [
        [
            'description',
            // "Find sources",
            null,
            new Date(2023, 10, 1),
            new Date(2023, 10, 5),
            null,
            100,
            null
        ]]

    function getData() {
        var dets;
        axios.get('http://127.0.0.1:3000/get-data').
            then(
                function (res) {
                    console.log(res.data);
                    dets = res.data;
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
                }
            );
    }



    return (
        <View style={styles.container}>
            <Text
                style={globalStyles().provaText}
            >Open up App.js to start working on your app!</Text>
            {/* <hr />
                <Button onPress={getData}
                ><Text>Get Data</Text></Button> */}
            <hr />
            <ProvaCustomHeader />
            <hr />
            <Button onPress={getData}
            ><Text>Get Data</Text></Button>
            <hr />
            <DetailsCard />
            {/* <hr />
            <Gantt /> */}
            <hr/>
            <MyGantt rows={rows}/>
        </View>
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
