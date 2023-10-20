import ReactGantt, { GanttRow } from 'react-gantt';
import React from 'react';
 
export default function NewGantt() {
    return (
      <ReactGantt
        templates={{
          myTasks: {
            title: 'My Tasks',
            steps: [
              {
                name: 'Task Phase One',
                color: '#0099FF'
              },
              {
                name: 'Task Phase Two',
                color: '#FF9900'
              }
            ]
          }
        }}
        leftBound={new Date(30, 9, 2023)}
        rightBound={new Date(30, 11, 2023)}
      >
        <GanttRow
          title="Task 1"
          templateName="myTasks"
          steps={[
            new Date(1, 10, 2023),
            new Date(1, 10, 2023),
            new Date(1, 10, 2023)
          ]}
        />
        <GanttRow
          title="Task 1"
          templateName="myTasks"
          steps={[
            new Date(1, 10, 2023),
            new Date(1, 10, 2023),
            new Date(1, 10, 2023)
          ]}
        />
      </ReactGantt>
    );
  
}