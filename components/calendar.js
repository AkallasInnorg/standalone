import React, {useState} from 'react';
import { useWindowDimensions } from 'react-native';
import { Button } from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MyCalendar ({markedDates}) {
  const [selected, setSelected] = useState('');
  const {height, width} = useWindowDimensions();
  const dates = [];
  // const markedDates = {
  //   '2023-11-15': {
  //     periods: [
  //       {startingDay: false, endingDay: true, color: '#5f9ea0'},
  //       {startingDay: false, endingDay: true, color: '#f0e68c'}
  //     ]
  //   },
  //   '2023-11-14': {
  //     periods: [
  //       {startingDay: false, endingDay: false, color: '#5f9ea0'},
  //       {startingDay: false, endingDay: false, color: '#f0e68c'}
  //     ]
  //   },
  //   '2023-11-13': {
  //     periods: [
  //       {startingDay: true, endingDay: false, color: '#5f9ea0'},
  //       {startingDay: true, endingDay: false, color: '#f0e68c'}
  //     ]
  //   }}

  return (
    <>
    <Calendar
    theme={{monthTextColor: 'black'}}
    headerStyle={{
    }}
      style={{
        height: height / 2,
        width: width / 2
      }}
      renderArrow={(direction)=> direction==='left' ? 
      <Ionicons name='chevron-back-outline' color={'black'} size={20}/>
      : <Ionicons name='chevron-forward-outline' color={'black'} size={20}/>}
      enableSwipeMonths={true}
      onDayPress={day => {
        setSelected(day.dateString);
        console.log(day.dateString);
      }}
      // markedDates={markedDates}
      markedDates={{markedDates}}
      markingType='multi-period'
    />
    {/* <Button onPress={()=>console.log(markedDates)}/> */}
    </>
  );
};
