import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from "./redux/store";
import Home from './components/Home/Home';
import Currencies from './components/Currencies/Currencies';
import Account from './components/Account/Account';
import Login from './components/Login/Login';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login}/>
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Currencies" component={Currencies}/>
          <Tab.Screen name="Account" component={Account}/>
        </Tab.Navigator>
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
