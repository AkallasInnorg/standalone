import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import NewGantt from './components/nikitaGantt';
import GoogleGantt from './components/googleGantt';
import MyCalendar from './components/calendar';
import PapaerCalendar from './components/paperDates';
import TextCarousel from './components/textCarousel';
import { Button } from 'react-native-elements';
// import { DragCalendar } from './components/daterangePicker';
// import PickerCalendar from './components/calendarPicker';
// import MyRangePicker from './components/calDatePicker';
// import MyCalendario from './components/calendario';
// import Picker from './components/daterangePicker';
// import Gantt from './components/gantt';


//NEW YORK
export default function App() {
  const prop = TextCarousel().props
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextCarousel/>
      <Button onPress={()=>console.log(prop)}/>
      {/* <Gantt/> */}
      <MyCalendar/>
      <hr/>
      {/* <DragCalendar/> Non funziona */}
      <PapaerCalendar/>
      <hr/>
      {/* <MyRangePicker/> */}
      <hr/>
      <GoogleGantt/>
      {/* <NewGantt/>  */}
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
