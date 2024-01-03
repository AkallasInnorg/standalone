import * as React from 'react';
import * as RN from 'react-native';
import { StyleSheet, Button, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, TextInput, Title } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import axios from 'axios';


// class TimeSheet extends React.Component {
export default function TimeSheetFunc (){
    // constructor() {
    //     super();
    //     this.state = {items: []};
    //   }



    var months = ["Gennaio", "Febbraio", "Marzo", "Aprile",
        "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    var weekDays = [
        "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"
    ];

    var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var selection = new Map()

    var selDays = []

    var state = {
        activeDate: new Date(),
        visible: false,
        text: '',
        daySelected: null,
        monthSelected: null,
        items: []
    }

    const getData = () => {
        var items;
        axios.get('http://127.0.0.1:3000/task/all').
            then(
                function (res) {
                    items = res.data
                })
        state.items = items
        return items
    }


    const changeMonth = (n) => {
        setState(() => {
            state.activeDate.setMonth(
                state.activeDate.getMonth() + n
            )
            return state;
        });
    }

    const toggleVisibility = (item, month) => {
        setState(() => {
            state.visible = !state.visible
            if (item) {
                state.daySelected = item
                state.monthSelected = month
                console.log(state.daySelected);
                console.log(state.monthSelected);
                console.log(typeof (item));
                console.log(typeof (month))
            }
            return state;
        })
    }

    const confirmTask = () => {
        if (selection.has(state.monthSelected)) {
            if (typeof (selection.get(state.monthSelected)) == 'object') {
                selDays.push(state.daySelected)
                selection.set(state.monthSelected, selDays)
            }
            else {
                selDays.push(selection.get(state.monthSelected))
                selDays.push(state.daySelected)
                selection.set(state.monthSelected, selDays)
            }
        } else {
            selection.set(state.monthSelected, state.daySelected)
        }
        console.log(selection)
        console.log(selection.get(state.monthSelected))
        console.log(selection.get(months[state.activeDate.getMonth()]))
        toggleVisibility()
    }

    const saveText = (inputText) => {
        setState(() => {
            state.text = inputText
        })
        console.log(state.text)
    }


    const generateMatrix = () => {
        var matrix = [];
        // Create header
        matrix[0] = weekDays;

        var year = state.activeDate.getFullYear();
        var month = state.activeDate.getMonth();
        var firstDay = new Date(year, month, 0).getDay();
        var prevMonth = month - 1;
        var maxDays = nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }
        //FILL THE DAYS OF THE PREVIOUS MONTH
        var firstCount = matrix[1].filter(el => el == -1).length
        var idx = 0;
        for (var el of matrix[1]) {
            if (el == -1) {
                el = nDays[prevMonth] - (firstCount - 1)
                console.log(el)
                matrix[1][idx] = el
            }
            firstCount--
            idx++
        }
        //FILL THE DAYS OF THE NEXT MONTH
        var count = 1
        matrix = matrix.filter(row => row[0] !== -1)
        for (var i = 5; i < matrix.length; i++) {
            for (var y = 0; y < 7; y++) {
                if (matrix[i][y] == -1) {
                    matrix[i][y] = count
                    count++
                }
            }
        }
        console.log(firstCount)
        console.log(prevMonth)
        console.log(matrix)
        return matrix;
    }


    function render() {
        var items = getData()
        var matrix = generateMatrix();
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                if (colIndex != 5 && colIndex != 6)
                    return (rowIndex == 0 ?
                        //render week days, sort of header
                        <RN.View style={styles.daysView}>
                            <RN.Text style={[styles.daysText]}>
                                {item}
                            </RN.Text>
                        </RN.View>
                        :
                        //render calendar days
                        <RN.View style={styles.calView}>
                            <RN.Text style={[styles.calText, {
                                fontWeight: (
                                    rowIndex == 5 && item < 10
                                    || rowIndex == 6 && item < 10
                                    || rowIndex == 1 && item > 10)
                                    ? '200' : '500'
                            }
                            ]}
                                onPress={() => toggleVisibility(item, months[state.activeDate.getMonth()])}
                            >{item}
                            </RN.Text>
                            {
                                selection.has(months[state.activeDate.getMonth()])
                                    &&
                                    selection.get(months[state.activeDate.getMonth()]) == Number(item)
                                    ||
                                    selection.has(months[state.activeDate.getMonth()])
                                    &&
                                    Array.from(selection.get(months[state.activeDate.getMonth()])).includes(Number(item))
                                    ?
                                    <RN.View key={item} style={{
                                        alignSelf: 'center', backgroundColor: 'black',
                                        height: '10%', marginBottom: '80%', width: '80%'
                                    }}></RN.View>
                                    : <></>}
                        </RN.View>
                    );
            });

            return (
                <RN.View
                    style={styles.rowItems}>
                    {rowItems}
                </RN.View>
            );
        });

        return (
            <RN.SafeAreaView style={styles.safeArea}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.View style={styles.header}>
                        <RN.Text style={styles.monthText}>
                            {months[state.activeDate.getMonth()]} &nbsp;
                            {state.activeDate.getFullYear()}
                        </RN.Text>
                    </RN.View>
                    <RN.View style={styles.arrows}>
                        <Ionicons name='chevron-back-outline' color={'black'} size={40}
                            onPress={() => changeMonth(-1)} />
                        <Ionicons name='chevron-forward-outline' color={'black'} size={40}
                            onPress={() => changeMonth(+1)} />
                    </RN.View>
                </RN.View>
                {rows}
                <Dialog visible={state.visible}
                    onDismiss={() => toggleVisibility()}
                    style={{ width: '50%', alignSelf: 'center' }}>
                    <Dialog.Title>Add Task</Dialog.Title>
                    <Dialog.Content style={{ flexDirection: 'row' }}>
                        {/* <Text>Title</Text> */}
                        <TextInput label={'Title'} onChangeText={text => saveText(text)} />
                        {/* <ScrollView style={{ height: '380px' }}>
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
                            </ListItem>))}
                        </ScrollView> */}
                    </Dialog.Content>
                    <Dialog.Actions>
                        {/* <Button title='Conferma' onPress={() => toggleVisibility()} /> */}
                        <Button title='Conferma' onPress={() => confirmTask()} />
                    </Dialog.Actions>
                </Dialog>
            </RN.SafeAreaView>
        );
    }
}

// Export for now to get rid of error and see preview:
// export default TimeSheet


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
        fontWeight: '500'
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
        width: '90%',
        borderRadius: 10,
        height: '100%'
    },
    header: {
        height: '5%',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: '3%'
    },
    monthText: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    },
    arrows: {
        columnGap: '70%',
        flexDirection: 'row',
        height: '5%',
        marginRight: '10%',
        marginTop: '3%'
    }

})