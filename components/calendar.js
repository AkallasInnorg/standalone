import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MyCalendar () {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      renderArrow={(left)=><Ionicons name='chevron-back-outline'/>}
      
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
      
    />
  );
};
