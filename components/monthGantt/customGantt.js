import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, Children } from 'react';
import { Card } from 'react-native-elements';
import axios from 'axios';

import GanttTask from './ganttTask';
import GanttBackground from './ganttBackground';

export default function MonthGantt() {
    const [checked, setChecked] = useState(false);
    const [lines, setLines] = useState(5);
    const [height, setHeight] = useState('55%');
    // const [items, setItems] = useState([]);

    const items = [
        { ID: '1', Title: 'Item 1', StartDate: '2023-12-01', EndDate: '2023-12-28' },
        { ID: '2', Title: 'Item 2', StartDate: '2023-12-28', EndDate: '2023-12-29' },
        { ID: '3', Title: 'Item 3', StartDate: '2023-12-17', EndDate: '2023-12-30' },
        { ID: '4', Title: 'Item 4', StartDate: '2023-12-15', EndDate: '2023-12-29' },
        { ID: '5', Title: 'Item 5', StartDate: '2023-12-02', EndDate: '2023-12-31' },
        { ID: '6', Title: 'Item 6', StartDate: '2023-12-28', EndDate: '2024-01-11' },
        { ID: '7', Title: 'Item 7', StartDate: '2023-11-28', EndDate: '2023-11-29' },
        { ID: '8', Title: 'Item 8', StartDate: '2023-11-15', EndDate: '2023-11-29' },
        // { ID: '8', Title: 'Item 8', StartDate: '2023-11-15', EndDate: '2023-11-29' },
        // { ID: '8', Title: 'Item 8', StartDate: '2023-11-15', EndDate: '2023-11-29' },
        // Add more items as needed
    ];

    // const getData = () => {
    //     var tempItems = []
    //     axios.get("http://127.0.0.1:3000/task/all").then(
    //       function (res) {
    //         console.log(res.data)
    //         for (var [key, value] in Object.entries(res.data)) {
    //           var obj = {};
    //           console.log(res.data[key])
    //           obj.ID = res.data[key]['ID'].toString()
    //           obj.Title = res.data[key]['description']
    //           obj.StartDate = res.data[key]['dev_start'].slice(0, 10)
    //           obj.EndDate = res.data[key]['planned_release'].slice(0, 10)
    //           console.log(obj)
    //           items.push(obj)
    //           tempItems.push(obj)
    //         }
    //         setItems(tempItems)
    //         console.log(items)
    //         return items
    //       }
    //     )
    //     return items
    //   }

    const getDaysInMonth = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();

        return lastDay;
    }

    const daysOfCurrentMonth = getDaysInMonth();
    console.log(daysOfCurrentMonth);

    const toggleSwitch = () => {
        setChecked(previousState => !previousState);
        if (!checked) {
            setLines(daysOfCurrentMonth);
        } else {
            setLines(5);
        }
    }

    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven'];

    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    console.log(firstDay);

    const mapDaysToLabel = (day, daysOfCurrentMonth) => {
        const daysMap = {
            1: "L",
            2: "M",
            3: "M",
            4: "G",
            5: "V",
            6: "S",
            0: "D"
        };

        let mappedDays = [];
        while (day < daysOfCurrentMonth + firstDay) {
            const index = day % 7;
            mappedDays.push(daysMap[index]);
            day++
        }

        return mappedDays;
    }

    const monthArray = mapDaysToLabel(firstDay, daysOfCurrentMonth);
    console.log(monthArray);

    function widthNeeded() {
        var len = 50
        var count = 0
        if (items.length >= 9) {
            for (var i = 9; i < items.length; i++) {
                count = i - 9
            }
        }
        console.log(count)
        len = len + (count * 2)
        console.log(len)
        var strLen = `${len}%`
        setHeight(strLen)
        console.log(height)
    }

    useEffect(() => {
        setLines(daysOfCurrentMonth);
        widthNeeded();
    }, [])

    return (
        <Card containerStyle={[styles.ganttCard]} wrapperStyle={styles.ganttCardContent}>
            <View style={styles.monthLabel}>
                {monthArray.map((day, index) => (<Text key={index} style={styles.monthText}>{day}</Text>))}
            </View>
            <GanttBackground lines={lines} />
            {items.map((item, index) => (
                <GanttTask key={item.ID} item={item} index={index} lines={lines} start={item.StartDate} end={item.EndDate} />
            ))}
        </Card>
    );
}

const styles = StyleSheet.create({
    ganttCard: {
        height: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
        flexDirection: 'column',
        margin: '0px'
    },
    ganttCardContent: {
        height: '100%',
    },
    label: {
        top: 20,
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '89%',
        left: '3%'
    },
    labelText: {
        marginLeft: '6%'
    },
    monthLabel: {
        marginBottom: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        left: '0.4%'
    },
    monthText: {
        marginLeft: '0.5%',
    },
    container: {
        flex: 1,
    },
    TestText: {
        fontSize: 45,
    },
    taskTitle: {
        color: 'white',
    },
});
