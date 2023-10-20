import { Chart } from "react-google-charts";
import React from "react";
import { View } from "react-native";


export default function GoogleGantt() {
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
            "Find sources",
            new Date(2023, 10, 1),
            new Date(2023, 10, 5),
            null,
            100,
            null,
        ],
        [
            "Write",
            "Write paper",
            null,
            new Date(2023, 10, 9),
            daysToMilliseconds(3),
            25,
            "Research,Outline",
        ],
        [
            "Cite",
            "Create bibliography",
            null,
            new Date(2023, 10, 7),
            daysToMilliseconds(1),
            20,
            "Research",
        ],
        [
            "Complete",
            "Hand in paper",
            null,
            new Date(2023, 10, 10),
            daysToMilliseconds(1),
            0,
            "Cite,Write",
        ],
        [
            "Outline",
            "Outline paper",
            null,
            new Date(2023, 10, 6),
            daysToMilliseconds(1),
            100,
            "Research",
        ],
    ];
    const data = [columns, ...rows];
    const options = {
        is3D: true,
        height: 500,
        width:800,
        gantt: {
          trackHeight: 50,
          criticalPathStyle: {
            stroke: "#e64a19",
            strokeWidth: 5,
          },
        },
      };

    return (
    <View>
        <Chart
            chartVersion="current"
            // diffdata={}
            chartType="Gantt"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />
    </View>
    )
}
