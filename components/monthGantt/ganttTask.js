import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';

export default function GanttTask({ item, index, lines, start, end }) {

    console.log("Index ", index);

    const onPress = (index) => {
        console.log("pressed");
        alert("Ciao, sono un task! " + index);
    }

    //converto le date da stringhe a numeri  //TEMPORANEO cambiare in accordo con il tipo data finale!!!
    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    console.log(startDate);
    console.log(endDate);

    // const numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    // console.log(numberOfDays);

    const getFirstDayOfTheWeek = () => {
        const now = new Date();
        const currentDayOfWeek = ((now.getDay() - 1) + 7) % 7; // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

        console.log(currentDayOfWeek);

        // Set the time to midnight to get the start of the day
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - currentDayOfWeek);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        return firstDayOfWeek;
    }

    const firstDayOfWeek = getFirstDayOfTheWeek();
    console.log(firstDayOfWeek)

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    console.log(firstDayOfMonth);

    //calcolo giorno iniziale; se non rientra nella settimana/mese in corso imposto a -1
    const getFirstDayIndex = (startDate, firstDayOfWeek, firstDayOfMonth) => {
        switch (lines) {
            case 5:
                if (startDate <= firstDayOfWeek) {
                    return 0;
                } else {
                    return (startDate - firstDayOfWeek) / (1000 * 60 * 60 * 24) + 1;
                }
            default:
                if (startDate <= firstDayOfMonth) {
                    return 0;
                } else {
                    return (startDate - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
                }
        }
    }

    const firstDayIndex = getFirstDayIndex(startDate, firstDayOfWeek, firstDayOfMonth);
    console.log(firstDayIndex);

    const getNumberOfDays = (firstDayOfWeek, startDate, endDate) => {
        var numberOfDays = 0;
        if (lines === 5) {
            if (firstDayIndex === 0) {
                numberOfDays = (endDate - firstDayOfWeek) / (1000 * 60 * 60 * 24) + 1;
            } else {
                numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
            }
        } else {
            if (firstDayIndex === 0) {
                numberOfDays = (endDate - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
            } else {
                numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
            }
        }

        return numberOfDays;
    }

    const numberOfDays = getNumberOfDays(firstDayOfWeek, startDate, endDate);
    console.log(numberOfDays);

    console.log(lines);

    return (
        // <View style={[styles.taskParent, {
        //     top: 65 + (index * 100),
        //     // width: `${(numberOfDays + index) * (1 / 5) * 100}%`
        // }]}>
        // <View style={[styles.taskParent, 
        // // { marginTop: lines === 5 ? 8 : 15 }
        // ]}>
            /* <TouchableOpacity style={[styles.taskContainer, */
            <Pressable style={[styles.taskContainer,
            {
                width: `${numberOfDays < 0 ? 0 : (numberOfDays) * (1 / lines) * 100 + 0.05 * numberOfDays}%`,
                left: `${firstDayIndex === 0 ? 0 : (firstDayIndex - 1) * (1 / lines) * 100 + 0.05 * firstDayIndex}%`,
                // height: lines === 5 ? 75 : 40,
                // marginTop: lines === 5 ? '7%' : '3%',
            }]}
                onPress={() => alert(index)}>
                <Text style={[styles.taskTitle, {
                    display: numberOfDays < 0 ? 'none' : 'flex'
                }]} onPress={() => { alert(index); }}>{item.ID} - {item.Title}</Text>
            {/* </TouchableOpacity> */}
            </Pressable>
        /* </View> */
    );
}
const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: 'blue',
        borderRadius: 5,
        height: '30px',
        // height: '6%',
        marginTop: '1%',
        // marginBottom: '-40%',
    },
    taskTitle: {
        color: 'white',
        // marginTop: '0.6%',
        marginLeft: '1%'
    },
    taskParent: {
        // marginTop: '1%',
        height: '10%',
        position: 'relative',
        zIndex: 2,
        marginBottom: 0,
        paddingBottom: 0
    }
});
// const styles = StyleSheet.create({
//     taskContainer: {
//         backgroundColor: 'blue',
//         borderRadius: 5,
//         height: '60%',
//         // height: '6%',
//         marginTop: '7%',
//     },
//     taskTitle: {
//         color: 'white',
//         marginTop: '0.6%',
//         marginLeft: '1%'
//     },
//     taskParent: {
//         height: '11.5%',
//         position: 'relative',
//         zIndex: 2,
//     }
// });