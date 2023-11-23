import * as React from 'react';
import * as RN from 'react-native';
import { StyleSheet, Button, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, TextInput, Title } from 'react-native-paper';



class OtherTimeSHeet extends React.Component {
    months = ["Gennaio", "Febbraio", "Marzo", "Aprile",
        "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    weekDays = [
        "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    selection = new Map()

    selDays = []

    state = {
        activeDate: new Date(),
        visible: false,
        text: '',
        daySelected: null,
        monthSelected: null
    }

    changeMonth = (n) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + n
            )
            return this.state;
        });
    }

    toggleVisibility = (item, month) => {
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

    confirmTask = () => {
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
        this.toggleVisibility()
    }

    saveText = (inputText) => {
        this.setState(() => {
            this.state.text = inputText
        })
        console.log(this.state.text)
    }

    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();
        var firstDay = new Date(year, month, 0).getDay();
        var prevMonth = month - 1;
        var maxDays = this.nDays[month];
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
        //FILL DAYS OF THE PREVIOUS MONTH
        var firstCount = matrix[1].filter(el => el == -1).length
        var idx = 0;
        for (var el of matrix[1]) {
            if (el == -1) {
                el = this.nDays[prevMonth] - (firstCount - 1)
                console.log(el)
                matrix[1][idx] = el
            }
            firstCount--
            idx++
        }
        //FILL DAYS OF THE NEXT MONTH
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

    render() {
        var matrix = this.generateMatrix();
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
                            <RN.Text style={[styles.calText,
                            {
                                fontWeight: (
                                    rowIndex == 5 && item < 10
                                    || rowIndex == 6 && item < 10
                                    || rowIndex == 1 && item > 10)
                                    ? '200' : ' '
                            }
                            ]}
                                onPress={() => this.toggleVisibility(item, this.months[this.state.activeDate.getMonth()])}
                            >{item}
                            </RN.Text>
                            {/* VIEW CONTENENTE IL TASK, VERRà RENDERIZZATO SOLO SE IL TASK ESISTE */}

                            {
                                this.selection.has(this.months[this.state.activeDate.getMonth()])
                                    &&
                                    this.selection.get(this.months[this.state.activeDate.getMonth()]) == Number(item)
                                    ||
                                    this.selection.has(this.months[this.state.activeDate.getMonth()])
                                    &&
                                    // this.selection.get(this.months[this.state.activeDate.getMonth()]).map(
                                    //     (day => day == Number(item))
                                    // )
                                    this.selection.get(this.months[this.state.activeDate.getMonth()]).includes(Number(item))
                                    ?
                                    <RN.View style={{
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
                            {this.months[this.state.activeDate.getMonth()]} &nbsp;
                            {this.state.activeDate.getFullYear()}
                        </RN.Text>
                    </RN.View>
                    <RN.View style={styles.arrows}>
                        <Ionicons name='chevron-back-outline' color={'black'} size={40}
                            onPress={() => this.changeMonth(-1)} />
                        <Ionicons name='chevron-forward-outline' color={'black'} size={40}
                            onPress={() => this.changeMonth(+1)} />
                    </RN.View>
                </RN.View>
                {rows}
                <Dialog visible={this.state.visible}
                    onDismiss={() => this.toggleVisibility()}
                    style={{ width: '50%', alignSelf: 'center' }}>
                    <Dialog.Title>Add Task</Dialog.Title>
                    <Dialog.Content style={{ flexDirection: 'row' }}>
                        {/* <Text>Title</Text> */}
                        <TextInput label={'Title'} onChangeText={text => this.saveText(text)} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        {/* <Button title='Conferma' onPress={() => this.toggleVisibility()} /> */}
                        <Button title='Conferma' onPress={() => this.confirmTask()} />
                    </Dialog.Actions>
                </Dialog>
            </RN.SafeAreaView>
        );
    }
}

export default OtherTimeSHeet


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
        width: '80%',
        borderRadius: 10
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