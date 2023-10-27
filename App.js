import React, { useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from './components/home';


const Stack = createNativeStackNavigator();
export const ThemeContext = React.createContext();

export default function App() {
  const [theme, setTheme] = useState('Dark');
  const themeData = { theme, setTheme };
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name='HomePage' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}