import React, {useEffect} from 'react';
import * as RN from 'react-native';
import { StyleSheet, Button, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, TextInput, Card } from 'react-native-paper';
// import { Card } from 'react-native-elements';



class WeekTimeSHeet extends React.Component {
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
        monthSelected: null,
        weekNun: 1
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
        console.log(this.selection.get(this.months[this.state.activeDate.getMonth()]))
        this.toggleVisibility()
    }

    saveText = (inputText) => {
        this.setState(() => {
            this.state.text = inputText
        })
        console.log(this.state.text)
    }

    getCurrentWeekNumber = () => {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfWeek = new Date(
            startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
        );

        const diffInTime = now.getTime() - startOfWeek.getTime();
        const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

        // this.setState(()=>{this.state.weekNun = diffInWeeks + 1})
        console.log(diffInWeeks + 1)
        console.log(this.state.weekNun)
        return diffInWeeks + 1; // Add 1 to account for the first week
    }

    // componentDidMount(){
    //     this.getCurrentWeekNumber()
    // }


    render() {
        var rows = [];
        rows = this.weekDays.map((val, idx) => {
            return (
                <RN.View key={idx + 1} style={{ flexDirection: 'column', height: '96.7%', width: '14.28%' }}>
                    <Text key={idx + 2} style={{ alignSelf: 'center', bottom: '1%' }}>{this.weekDays[idx]}</Text>
                    <Card key={idx} style={{ backgroundColor: 'trans', height: '100%', width: '100%', flexDirection: 'column' }}>
                        {/* <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }} />
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }} />
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }} />
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }} />
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>.</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card>
                        <Card style={{ width: '100%', height: '40.741%', backgroundColor: 'trans' }}>CARD</Card> */}
                    </Card>
                </RN.View>
            )
        })
        return (
        <RN.View style={{ flex: 1, flexDirection: 'row', height: '100%', width: '80%' }}>
            <RN.SafeAreaView style={styles.safeArea}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.View style={styles.header}>
                        <RN.Text style={styles.monthText}>
                            {this.months[this.state.activeDate.getMonth()]} &nbsp;
                            {this.state.activeDate.getFullYear()} &nbsp;
                            Settimana N° {this.state.weekNun}
                        </RN.Text>
                    </RN.View>
                    <RN.View style={styles.arrows}>
                        <Ionicons name='chevron-back-outline' color={'black'} size={40}
                            onPress={() => this.changeMonth(-1)} />
                        <Ionicons name='chevron-forward-outline' color={'black'} size={40}
                            onPress={() => this.changeMonth(+1)} />
                    </RN.View>
                </RN.View>
                <RN.View style={{ flexDirection: 'row', flex: 1 }}>
                    {rows}
                </RN.View>
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
            </RN.SafeAreaView></RN.View>
        );
    }
}

export default WeekTimeSHeet


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
        borderRadius: 10
    },
    header: {
        height: '5%',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: '1%',
        marginBottom: '5%'
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