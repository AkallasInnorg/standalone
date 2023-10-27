import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import GoogleGantt from './components/googleGantt';
import MyCalendar from './components/calendar';
import PapaerCalendar from './components/paperDates';
import TextCarouselClass from './components/classTextCarousel';
import CustomHeader from './components/customHeaderPartial';
import ProvaCustomHeader from './components/provaCustomHeader';


//NEW YORK
export default function App() {
  const periods = ['il tuo giorno', 'la tua settimana', 'il tuo mese'];
  var [period, setPeriod] = useState(periods[0]);
  var [count, setCount] = useState(0);

  function changePeriodRight() {
      if (count < 2) {
          count++
          setCount(count)
          setPeriod(periods[count])
          console.log(period)
      } else {
          count = 0;
          setCount(count);
          setPeriod(periods[count])
          console.log(period)
      }
  }
  function changePeriodLeft() {
      if (count > 0) {
          count--
          setCount(count)
          setPeriod(periods[count])
          console.log(period)     
      } else { 
          count = 2 
          setCount(count)
          setPeriod(periods[count])
          console.log(period)
      }
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextCarouselClass period={period} 
      leftFunction={changePeriodLeft}
      rightFunction={changePeriodRight}/>
      <Text>{period === periods[1] ? `questa è ${period}` : `questo è ${period}` }</Text>
      <Button onPress={() => console.log(period)} />
      <CustomHeader 
      period={period}
      leftFunction={changePeriodLeft}
      rightFunction={changePeriodRight}
      frase={period === periods[1] ? `questa è` : `questo è` } />
      <hr/>
      <ProvaCustomHeader/>
      <MyCalendar />
      <hr />
      <PapaerCalendar />
      <hr />
      <GoogleGantt />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
