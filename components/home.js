import React, { useEffect, useState, useReducer, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions, Animated, TextInput, SafeAreaView } from 'react-native';
import { Button, Card, Overlay, ListItem } from 'react-native-elements';
import axios from 'axios';
import { Dialog, Title } from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown';
import ProvaCustomHeader from './provaCustomHeader';
import globalStyles from '../utils/globalStyles';
import MonthGantt from './monthGantt/customGantt';
import WeekTimeSHeetFunc from './week_func_timesheet';
import FilterBar from './filterBar';
import TimeSheet from './timeSheet';
import TimeSheetFunc from './timeSheetFunc';



//NEW YORK
export default function Home() {
    const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
    var [period, setPeriod] = useState(periods[0]);
    var [count, setCount] = useState(0);
    var [visible1, setVisible1] = useState(true)
    var [id, setId] = useState('');
    var row = [];
    var rows = [];
    var dates = [];
    var arrayOfDates = [];
    var properties = [];
    var dets = [];
    var detailsData;
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
        // console.log(dates);
        // console.log(arrayOfDates);
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
                properties[array[i]] = {
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
        axios.get('http://127.0.0.1:3000/task/all').
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
                        // console.log(rows);
                        // console.log(dets);
                        return rows, dets;
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

    function getCurrentWeekNumber() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfWeek = new Date(
            startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
        );

        const diffInTime = now.getTime() - startOfWeek.getTime();
        const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

        console.log(diffInWeeks + 1)
        return diffInWeeks + 1; // Add 1 to account for the first week
    }

    var tab = MonthGantt(_).props.children[2]

    useEffect(() => { getData(); }, [rows]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const renderText = () => {
        console.log('renderizzare')
        setId(global.taskId)
        forceUpdate()
    }

    const [visible, setVisible] = useState(false);
    function toggleOver() {
        setVisible(!visible);
    }

    const list = [
        {
            name: 'Amir Kallas',
            subTitle: 'Junior developer'
        },
        {
            name: 'Francesca Caivano',
            subTitle: 'Senior developer'
        },
        {
            name: "Marco D'Araio",
            subTitle: 'Middle developer'
        },
        {
            name: "Marco D'Araio",
            subTitle: 'Middle developer'
        },
        {
            name: "Marco D'Araio",
            subTitle: 'Middle developer'
        },
        {
            name: "Marco D'Araio",
            subTitle: 'Middle developer'
        }
    ]

    var drop = (plHolder, opener, setOpener, width) => {
        return <View
            style={{ width: width }}
        ><DropDownPicker
                zIndex={3000}
                zIndexInverse={3000}
                style={{ borderRadius: 20 }}
                placeholderStyle={{ borderRadius: 20 }}
                searchContainerStyle={{ borderRadius: 20 }}
                dropDownContainerStyle={{ borderRadius: 20 }}
                containerStyle={{ borderRadius: 20 }}
                theme="DARK"
                placeholder={plHolder}
                autoScroll={true}
                open={opener}
                value={value}
                items={items}
                setOpen={setOpener}
                setValue={setValue}
                setItems={setItems}
            /></View>
    }

    const [toggle, setToggle] = useState(true)
    const toggleHeight = useRef(new Animated.Value(500)).current;

    function toggleVisibility() { setVisible1(!visible1) }

    return (
        <ScrollView>
            <View style={globalStyles().containerHome}>
                <hr />
                {/* <View>
                    <Button title="Open Overlay" onPress={toggleOver} />
                    <Overlay isVisible={visible} onBackdropPress={toggleOver} overlayStyle={{
                        padding: 0, borderRadius: 20
                    }}>
                        <Card containerStyle={{
                            backgroundColor: 'plum', margin: 0, borderRadius: 15,
                            height: '400px', width: '400px'
                        }}>
                            <ScrollView style={{height: '380px'}}>
                                {list.map((l, i) =>
                                   ( <ListItem key={i} bottomDivider containerStyle={{backgroundColor: 'trans'}}>
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                {l.name}
                                            </ListItem.Title>
                                            <ListItem.Subtitle>
                                                {l.subTitle}
                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>)
                                )
                                }
                            </ScrollView>
                        </Card>
                    </Overlay>
                </View> */}
                {/* <FilterBar animatedHeight={toggleHeight} toggle={toggle}/> */}
                {/* <WeekTimeSHeetFunc/> */}
                {/* <Button title="Open Overlay" onPress={toggleOver} /> */}
                <Button title="Open Overlay" onPress={toggleVisibility} />
                {/* <TimeSheetFunc/> */}
                <MonthGantt />
                <Dialog visible={visible1}
                    onDismiss={() => toggleVisibility()}
                    style={{ width: '70%', alignSelf: 'center', height: '90%' }}>
                    <Dialog.Title style={{ fontSize: '250%' }}>Add Task</Dialog.Title>
                    <Dialog.Content style={{
                        // flexDirection: 'row',
                        flexDirection: 'column',
                        // columnGap: '10%',
                        rowGap: '10%',
                        height: '80%', width: '100%'
                    }}>
                        <SafeAreaView style={{ flexDirection: 'row', columnGap: '10%', height: '70%' }}>
                            <SafeAreaView style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: '120%' }}>Attività svolta presso:</Text>
                                <SelectDropdown dropdownStyle={{backgroundColor: 'plum'}}/>
                            </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView style={{ flexDirection: 'row', columnGap: '10%', height: '70%' }}>
                            <SafeAreaView style={styles.container}>
                                <Text style={{ fontSize: '120%' }}>Descrizione:</Text>
                                <View style={styles.containerView}>
                                    <TextInput
                                        style={styles.inputSimpleBorder}
                                        placeholder="Enter Description"
                                        placeholderTextColor={'grey'}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View>
                            </SafeAreaView>
                            <SafeAreaView style={styles.container}>
                                <Text style={{ fontSize: '120%' }}>Note interne:</Text>
                                <View style={styles.containerView}>
                                    <TextInput
                                        style={styles.inputSimpleBorder}
                                        placeholder="Enter Internal note"
                                        placeholderTextColor={'grey'}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View>
                            </SafeAreaView>
                        </SafeAreaView>
                    </Dialog.Content>
                    <Dialog.Actions style={{ alignItems: 'flex-end' }}>
                        <Button
                            containerStyle={{ backgroundColor: 'white' }} buttonStyle={{ backgroundColor: 'grey' }}
                            title='Annulla' onPress={() => toggleVisibility()} />
                        <Button title='Conferma' onPress={() => toggleVisibility()} />
                    </Dialog.Actions>
                </Dialog>
                <hr />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        width: '45%',
        flexDirection: 'column',
        rowGap: '3%',
        // paddingBottom: '10px'
    },
    containerView: {
        height: '70%',
        // width: '100%'
        // marginTop: '70%',
        // padding: 30,
    },
    inputSimpleBorder: {
        // borderRadius: '15',
        // marginBottom: 15,
        // backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'grey',
        padding: '2%',
        fontSize: 15,
        textAlignVertical: 'top',
        height: '60%'
    },
});
