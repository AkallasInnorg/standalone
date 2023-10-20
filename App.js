import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import NewGantt from './components/nikitaGantt';
import GoogleGantt from './components/googleGantt';
import MyCalendar from './components/calendar';
// import Gantt from './components/gantt';


//NEW YORK
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Gantt/> */}
      <MyCalendar/>
      <GoogleGantt/>
      <NewGantt/> 
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
