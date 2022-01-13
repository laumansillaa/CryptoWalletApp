
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Loading from './components/LOADING/LOADING';
import { LoadingFalse, RetrieveToken } from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Index() {

const dispatch = useDispatch();
let userToken =useSelector(state => state.userToken);

  const [logged, setLogged] = useState(false);
  const log = useSelector(state => state.Log);
  let isLoading = useSelector(state => state.isLoading);
 
  useEffect(() => {
    isLogged()
  },[log])
 
  const isLogged = () => {
    if(log) {    
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  useEffect(() => {
    setTimeout( async () => {
      userToken= null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          isLoading= false;
          setLogged(true);
        } else {
          dispatch(RetrieveToken(userToken));
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }, [])


  if(isLoading) { return (
                  <>
                  <Loading/>
                  </>
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





        
      
        
        
    