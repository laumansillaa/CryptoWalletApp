import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import Currencies from './components/Currencies/Currencies';
import Account from './components/Account/Account';
import HeaderUser from './components/HeaderUser/HeaderUser';
import { useState, useEffect } from 'react';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from "./redux/store";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from './index';

export default function App() {

  return ( 
    <Provider store={store}>
      <Index />
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
