
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import HomeIndex from './components/Home/HomeIndex';
import AccountIndex from './components/Account/AccountIndex';
import HeaderCurrencies from "./components/HeaderCurrencies/HeaderCurrencies"
import SplashScreen from './components/SplashScreen/SplashScreen';
import { View, Text } from 'native-base';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Index() {

  const [logged, setLogged] = useState(false);
  const log = useSelector(state => state.Log);
  const isLoading = useSelector(state => state.isLoading);
 
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


  if(isLoading) { return (
                  <View style={{flex:1, alignItems:"center", justifyContent: "center",}}>
                    <Text>LOADING</Text>
                  </View>
  )
  }

  return ( 
   
      <NavigationContainer>
        {!logged ? <Stack.Navigator initialRouteName='SplashScreen'>
                      <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                      <Stack.Screen name="Login" component={Login}/>
                      <Stack.Screen name="Register" component={Register}/>
                   </Stack.Navigator>
    : 
                   <Tab.Navigator initialRouteName="Home">
                      <Tab.Screen name="Home" component={HomeIndex}/>
                      <Tab.Screen name="Currencies" component={HeaderCurrencies}/>
                      <Tab.Screen name="Account" component={AccountIndex}/>
                   </Tab.Navigator>
      }</NavigationContainer>
  );
}





        
      
        
        
    