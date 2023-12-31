import React, { useEffect, useState } from 'react';
import * as RN from 'react-native';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, TextInput, Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
// import { Card } from 'react-native-elements';



export default function WeekTimeSHeetFunc({ items }) {
    const months = ["Gennaio", "Febbraio", "Marzo", "Aprile",
        "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    const weekDays = [
        "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"
    ];

    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var selection = new Map()

    var selDays = []

    var state = {
        activeDate: new Date(),
        visible: false,
        text: '',
        daySelected: null,
        monthSelected: null,
        weekNun: 1
    }

    const currentWeek = getCurrentWeekNumber()

    const [weekNum, setWeekNum] = useState(currentWeek)
    const [year, setYear] = useState(state.activeDate.getFullYear())

    var dets = []

    function getData() {
        axios.get('http://127.0.0.1:3000/task/all').
            then(
                function (res) {
                    dets = res.data;
                    console.log(dets)
                })
    }

    function changeWeek(n) {
        if (weekNum >= 51 && n < 0) {
            setWeekNum(weekNum + n)
            return weekNum
        }
        if (weekNum < 2 && n < 0) {
            setYear(year - 1)
            setWeekNum(52)
            return weekNum
        }
        if (weekNum <= 51) {
            setWeekNum(weekNum + n)
            return weekNum
        }
        else
            setYear(year + 1)
        { setWeekNum(1) }
        console.log(weekNum)
        return weekNum
    }

    function toggleVisibility(item, month) {
        this.setState(() => {
            this.state.visible = !this.state.visible
            if (item) {
                this.state.daySelected = item
                this.state.monthSelected = month
                console.log(this.state.daySelected);
                console.log(this.state.monthSelected);
                console.log(typeof (item));
                console.log(typeof (month))
            }
            return this.state;
        })
    }

    function confirmTask() {
        if (this.selection.has(this.state.monthSelected)) {
            if (typeof (this.selection.get(this.state.monthSelected)) == 'object') {
                this.selDays.push(this.state.daySelected)
                this.selection.set(this.state.monthSelected, this.selDays)
            }
            else {
                this.selDays.push(this.selection.get(this.state.monthSelected))
                this.selDays.push(this.state.daySelected)
                this.selection.set(this.state.monthSelected, this.selDays)
            }
        } else {
            this.selection.set(this.state.monthSelected, this.state.daySelected)
        }
        console.log(this.selection)
        console.log(this.selection.get(this.state.monthSelected))
        console.log(this.selection.get(this.months[this.state.activeDate.getMonth()]))
        this.toggleVisibility()
    }

    function saveText(inputText) {
        this.setState(() => {
            this.state.text = inputText
        })
        console.log(this.state.text)
    }

    function getCurrentWeekNumber(date) {
        var now = new Date();
        if (date) {
            now = new Date(date)
        }
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfWeek = new Date(
            startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
        );

        const diffInTime = now.getTime() - startOfWeek.getTime();
        const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));
        const currWeek = diffInWeeks + 1
        console.log(currWeek)
        return currWeek
    }

    useEffect(() => { getData() }, [dets])

    function renderRows() {
        var rows = [];
        rows = weekDays.map((val, idx) => {
            return (
                <RN.View key={idx + 1} style={{ flexDirection: 'column', height: '96.7%', width: '14.28%' }}>
                    <Text key={idx + 2} style={{ alignSelf: 'center', bottom: '1%' }}>{weekDays[idx]}</Text>
                    <Card key={idx} style={{ backgroundColor: 'trans', height: '100%', width: '100%', flexDirection: 'column' }}>
                        <View key={idx} style={{
                            alignSelf: 'center', backgroundColor: 'white',
                            height: '10%', marginBottom: '80%', width: '100%', borderRadius: 20
                        }}><Text>{state.text}</Text></View>
                        {/* IL TASK DEVE CORRISPONDERE PER NUMERO DI SETTIMANA, PER GIORNO DELLA SETTIMANA  E PER ANNO*/}
                    </Card>
                </RN.View>
            )
        }); return rows;
    }
    return (
        <>
            <RN.View><Button onPress={() => getCurrentWeekNumber('2023-02-05T23:00:00.000Z')}></Button></RN.View>
            <RN.View style={{ flex: 1, flexDirection: 'row', height: '100%', width: '90%', zIndex: 1000 }}>
                <RN.SafeAreaView style={styles.safeArea}>
                    <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
                        <RN.View style={styles.header}>
                            <RN.Text style={styles.monthText}>
                                {/* {this.months[this.state.activeDate.getMonth()]} &nbsp; */}
                                {/* {state.activeDate.getFullYear()} &nbsp; */}
                                {year} &nbsp;
                                {/* Settimana N° {getCurrentWeekNumber()} */}
                                {/* Settimana N° {state.weekNun} */}
                                Settimana N° {weekNum}
                            </RN.Text>
                        </RN.View>
                        <RN.View style={styles.arrows}>
                            <Ionicons name='chevron-back-outline' color={'black'} size={40}
                                onPress={() => changeWeek(-1)} />
                            <Ionicons name='chevron-forward-outline' color={'black'} size={40}
                                onPress={() => { changeWeek(+1); console.log(dets) }} />
                        </RN.View>
                    </RN.View>
                    <RN.View style={{ flexDirection: 'row', flex: 1 }}>
                        {renderRows()}
                    </RN.View>
                    <Dialog visible={state.visible}
                        onDismiss={() => toggleVisibility()}
                        style={{ width: '50%', alignSelf: 'center' }}>
                        <Dialog.Title>Add Task</Dialog.Title>
                        <Dialog.Content style={{ flexDirection: 'row' }}>
                            {/* <Text>Title</Text> */}
                            {/* <TextInput label={'Title'} onChangeText={text => saveText(text)} /> */}
                            <ScrollView style={{ height: '380px' }}>
                                {items.map((l, i) =>
                                (<ListItem key={i} bottomDivider containerStyle={{ backgroundColor: 'trans' }}>
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
                        </Dialog.Content>
                        <Dialog.Actions>
                            {/* <Button title='Conferma' onPress={() => this.toggleVisibility()} /> */}
                            <Button title='Conferma' onPress={() => confirmTask()} />
                        </Dialog.Actions>
                    </Dialog>
                </RN.SafeAreaView></RN.View></>
    );
    // }
}


const styles = StyleSheet.create({
    daysText: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontWeight: 'bold'
    },
    daysView: {
        flex: 1,
        flexDirection: 'column',
        width: '20%',
        borderRadius: 10,
    },
    calView: {
        flex: 1,
        flexDirection: 'column',
        margin: 0,
        height: '130%',
        width: '20%',
        borderRadius: 10,
    },
    calText: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    rowItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'plum',
        // width: '100%',
        borderRadius: 10,
        zIndex: 1000
    },
    header: {
        height: '5%',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: '1%',
        marginBottom: '5%',
        zIndex: 1000
    },
    monthText: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        // marginBottom: '2%'
    },
    arrows: {
        columnGap: '70%',
        flexDirection: 'row',
        height: '5%',
        marginRight: '10%',
        marginTop: '1%',
        marginBottom: '5%'
    }

})