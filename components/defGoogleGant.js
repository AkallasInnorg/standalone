import { Chart } from "react-google-charts";
import React from "react";
import { Card } from "react-native-elements";
import { View, useWindowDimensions, ScrollView } from "react-native";


export default function Gantt() {
    const { height, width } = useWindowDimensions();
    
    function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }

    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ];

    const rows = [
        [
            "Research",
            // "Find sources",
            null,
            new Date(2023, 10, 1),
            new Date(2023, 10, 5),
            null,
            100,
            null,
        ],
        [
            "Write",
            // "Write paper",
            null,
            new Date(2023, 10, 6),
            new Date(2023, 10, 9),
            daysToMilliseconds(3),
            25,
            // "Research,Outline",
            null
        ],
        [
            "Cite",
            // "Create bibliography",
            null,
            new Date(2023, 10, 5),
            new Date(2023, 10, 7),
            daysToMilliseconds(1),
            20,
            // "Research",
            null
        ],
        [
            "Complete",
            // "Hand in paper",
            null,
            new Date(2023, 10, 9),
            new Date(2023, 10, 11),
            daysToMilliseconds(1),
            0,
            // "Cite,Write",
            null
        ],
        [
            "Outline",
            // "Outline paper",
            null,
            new Date(2023, 10, 5),
            new Date(2023, 10, 6),
            daysToMilliseconds(1),
            100,
            // "Research",
            null
        ],
    ];
    const data = [columns, ...rows];
    const options = {
        is3D: false,
        height: (height * 0.42),
        width: (width * 0.9),
        gantt: {
            criticalPathEnabled: false,
            innerGridHorizLine: {
                stroke: "#ffe0b2",
                strokeWidth: 2,
            },
        },
    };

    return (
        <Card containerStyle={{
            elevation: -1,
            zIndex: 0,
            width: '60%',
            height: height * 0.4,
            borderRadius: 10,
        }}>
            <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={true} 
            contentContainerStyle={{height: height * 0.35}}>
            <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <Chart
                    chartVersion="current"
                    chartType="Gantt"
                    height="100%"
                    data={data}
                    options={options}
                />
            </ScrollView>
            </View>
            </ScrollView>
        </Card>
    )
}
