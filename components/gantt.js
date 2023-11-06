import { Chart } from "react-google-charts";
import React from "react";
import { Card } from "react-native-elements";
import { View, useWindowDimensions, ScrollView } from "react-native";


export default function MyGantt ({rows}){
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
        { type: "string", label: "Dependencies" }
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
            }
        }
    };

    return (
        <Card containerStyle={{
            elevation: -1,
            zIndex: 0,
            width: '80%',
            height: height * 0.6,
            borderRadius: 10}}>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <Chart
                        chartVersion="current"
                        chartType="Gantt"
                        height="100%"
                        data={data}
                        options={options}/>
                </ScrollView>
            </View>
        </Card>
    )
}