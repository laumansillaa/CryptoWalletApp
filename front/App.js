import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from "./redux/store";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
