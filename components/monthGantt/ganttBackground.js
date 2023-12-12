import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Children } from 'react';

export default function GanttBackground({ lines }) {
    //const numberOfLines = 5;
    console.log(lines);

    const getCurrentIndex = () => {
        //leggo la data odierna
        const currentDate = new Date();
        if (lines === 5) {
            const currentDay = currentDate.getDay();
            if (currentDay === 0 || currentDay === '6') {
                return -1;
            } else {
                return currentDay - 1;
            }
        } else {
            const currentMonthDay = currentDate.getDate();
            console.log(currentMonthDay);
            return currentMonthDay - 1;
        }
    }

    const currentIndex = getCurrentIndex();
    console.log(currentIndex);

    return (
        <View style={styles.backgroundContainer}>
            {[...Array(lines)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.line,
                        {
                            left: `${index === currentIndex ? (index / lines) * 100 : (index / lines) * 100}%`, // Adjust position based on the number of lines
                            backgroundColor: index === currentIndex ? 'red' : '#bbc2c7',
                            width: index === currentIndex ? `${1 / lines * 100}%` : `0.07%`,
                            borderRadius: index === currentIndex ? 0 : 50,
                            opacity: index === currentIndex ? '20%' : '100%',
                            zIndex: 0
                        },
                    ]}
                />
            ))}
            <View
                style={[
                    styles.line,
                    {
                        left: `100%`, // Adjust position based on the number of lines
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        marginBottom: 0,
        paddingBottom: 0,
        height: '110%',
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        top: '10%'
    },
    line: {
        position: 'relative',
        backgroundColor: '#F3F4F5',
        width: '0.05%'
    },
});
