import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MyCalendar () {
  const [selected, setSelected] = useState('');

  // const getMarked = () => {
  //   let marked = {};
  //   for(let i = 1; i <= 10; i++) {
  //     let day = i.toString().padStart(2, '0');
  //     let periods = [
  //       {
  //         startingDay: i == 1,
  //         endingDay: i == 10,
  //         color: 'teal',
  //       },
  //       (i >= 2 && i <= 6) && {
  //         startingDay: i == 2,
  //         endingDay: i == 6,
  //         color: 'orange',
  //       }
  //     ];
  //     marked[`2023-10-${day}`] = {
  //       periods
  //     };
  //   }
  //   return marked;
  // };

  return (
    <Calendar
    theme={{monthTextColor: 'black'}}
    headerStyle={{
    }}
      style={{
        // backgroundColor: 'black',
        // borderBottomColor: 'black'
      }}
      renderArrow={(direction)=> direction==='left' ? 
      <Ionicons name='chevron-back-outline' color={'black'} size={20}/>
      : <Ionicons name='chevron-forward-outline' color={'black'} size={20}/>}
      enableSwipeMonths={true}
      onDayPress={day => {
        setSelected(day.dateString);
        console.log(day.dateString)
      }}
      markedDates={{
        [selected]: {
            marked: true,
            selected: true, 
            disableTouchEvent: true, 
            selectedDotColor: 'orange',}
      }}
      markingType='multi-period'
      // markedDates={getMarked()}
    />
  );
};
