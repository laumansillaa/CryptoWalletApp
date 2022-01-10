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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [logged, setLogged] = useState(false);
  const log = useSelector(state => state.Log);
 
  useEffect(() => {
    isLogged()
  },[log])
 
  const isLogged = () => {
    console.log(log);
  
    if(log) {    
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  return ( 
    <Provider store={store}>
      <NavigationContainer>
        {!logged ? <Stack.Navigator initialRouteName='Login'>
                      <Stack.Screen name="Login" component={Login}/>
                      <Stack.Screen name="Register" component={Register}/>
                   </Stack.Navigator>
    : 
                   <Tab.Navigator initialRouteName="Home">
                      <Tab.Screen name="Home" component={Home}/>
                      <Tab.Screen name="Currencies" component={Currencies}/>
                      <Tab.Screen name="Account" component={Account} options={{headerTitle:()=><HeaderUser/>}}/>
                   </Tab.Navigator>
      }</NavigationContainer>
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
