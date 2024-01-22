import React, { useEffect, useState, useReducer, useRef } from 'react';
import {
    StyleSheet, Text, View, ScrollView, FlatList,
    useWindowDimensions, Animated, TextInput, SafeAreaView
} from 'react-native';
import { Button, Card, Overlay, ListItem } from 'react-native-elements';
import axios from 'axios';
import { Dialog, Title } from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown';

import AddTaskDialog from './dialogTask';
import ProvaCustomHeader from './provaCustomHeader';
import globalStyles from '../utils/globalStyles';
import MonthGantt from './monthGantt/customGantt';
import WeekTimeSHeetFunc from './week_func_timesheet';
import FilterBar from './filterBar';
import TimeSheet from './timeSheet';
import TimeSheetFunc from './timeSheetFunc';
import WikiGridList from './wikiGridList';



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
            }
        console.log(properties)
        return properties;
    }


    function getData() {
        // axios.get('http://127.0.0.1:3000/task/all').
        axios.get('http://localhost:3000/task/all').
        // axios.get('http://192.168.1.61:3000/task/all/0').
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
    const toggleHeight = useRef(new Animated.Value(300)).current;

    function toggleVisibility() { setVisible1(!visible1) }

    function cardRow() {
        return (<>
            <Card containerStyle={styles.cardStyle}>
            </Card>
            <Card containerStyle={styles.cardStyle}>
            </Card>
            <Card containerStyle={styles.cardStyle}>
            </Card>
            <Card containerStyle={styles.cardStyle}>
            </Card>
            <Card containerStyle={styles.cardStyle}>
            </Card></>
        )
    }

    const dataSource = [
        { id: 1, item: 'File1' },
        { id: 2, item: 'File2' },
        { id: 3, item: 'File3' },
        { id: 4, item: 'File4' },
        { id: 5, item: 'File5' },
        { id: 6, item: 'File6' },
        { id: 7, item: 'File7' },
        { id: 8, item: 'File8' },
        { id: 9, item: 'File9' },
        { id: 10, item: 'File10' },
        { id: 11, item: 'File11' },
        { id: 12, item: 'File12' },
        { id: 13, item: 'File13' },
        { id: 14, item: 'File14' },
        { id: 15, item: 'File15' },
        { id: 16, item: 'File16' },
        { id: 17, item: 'File17' },
        { id: 18, item: 'File18' },
        { id: 19, item: 'File19' },
        { id: 20, item: 'File20' },
        { id: 21, item: 'File21' },
        { id: 22, item: 'File22' },
        { id: 23, item: 'File23' },
        { id: 24, item: 'File24' },
        { id: 25, item: 'File25' },
    ]

    return (
        <ScrollView>
            <View style={globalStyles().containerHome}>
                <hr />
                {/* <View style={styles.viewStyle}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                        {cardRow()}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                        {cardRow()}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                        {cardRow()}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', paddingBottom: '1%' }}>
                        {cardRow()}
                    </View>
                    </View> */}
                    {<WikiGridList/>}
                    {/* <WeekTimeSHeetFunc items={dets}/> */}

                {/* <SafeAreaView style={styles.container1}>
                    <FlatList
                        columnWrapperStyle={{
                            flex: 1,
                            paddingVertical: 0,
                        }}
                        data={dataSource}
                        renderItem={({ item }) => (
                            // <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            //     <Text>{item.item}</Text>
                            // </View>
                            <Card containerStyle={styles.cardStyle1}>
                                <Text style={{ color: 'white' }}>{item.item}</Text>
                            </Card>
                        )}
                        //Setting the number of column
                        numColumns={5}
                        keyExtractor={(item, index) => index}
                    />
                </SafeAreaView> */}
                <hr />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    cardStyle: {
        width: '18%',
        height: '90%',
        backgroundColor: 'black',
        borderRadius: 15,
        // verticalAlign: 'middle',
    },
    cardStyle1: {
        flex: 1,
        width: '30%',
        height: '100%',
        backgroundColor: 'black',
        borderRadius: 15,
        margin: 0,
        paddingVertical: '8%'
        // verticalAlign: 'middle',
    },
    viewStyle: {
        // rowGap: '10%',
        width: '90%',
        height: '90%',
        backgroundColor: 'plum',
        borderRadius: 15,
        flexDirection: 'column',
        // paddingBottom: '1%',
        flex: 1
    },
    container: {
        justifyContent: 'flex-start',
        width: '45%',
        flexDirection: 'column',
        rowGap: '3%',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'plum',
        width: '90%',
        borderRadius: 15
    },
    containerView: {
        height: '70%'
    },
    inputSimpleBorder: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'grey',
        padding: '2%',
        fontSize: 15,
        textAlignVertical: 'top',
        height: '60%'
    },
    dialogStyle: {
        width: '70%',
        alignSelf: 'center',
        height: '90%'
    },
    titleStyle: {
        fontSize: '250%',
        textAlign: 'center'
    },
    contentStyle: {
        flexDirection: 'column',
        rowGap: '25%',
        height: '80%',
        width: '100%'
    },
    firstRow: {
        flexDirection: 'row',
        columnGap: '10%',
        height: '20%',
        width: '40%',
        flex: 1
    },
    firstDDStyle: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15
    },
    firstDbutton: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15,
        width: '140%'
    },
    secondRow: {
        flexDirection: 'row',
        columnGap: '10%',
        height: '40%',
        width: '80%',
        flex: 1
    },
    secondDDStyle: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15
    },
    secondDButton: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15,
        width: '100%',
        flexWrap: 'wrap'
    },
    hourText: {
        backgroundColor: 'plum',
        width: '60%',
        fontSize: 25,
        padding: '2.5%',
        borderRadius: 15
    }
});
