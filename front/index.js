import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import Footer from '../front/components/Footer/Footer'

const Stack = createNativeStackNavigator();

export default function Index() {

  const [logged, setLogged] = useState(false);
  const log = useSelector(state => state.Log);

  useEffect(() => {
    isLogged()
  }, [log])

  const isLogged = () => {
    console.log(log);

    if (log) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  return (

    <NavigationContainer>
      {!logged ? <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
        :
        <Footer />
      }</NavigationContainer>
  );
}









