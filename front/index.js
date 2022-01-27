import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import SplashScreen from './components/SplashScreen/SplashScreen';
import Loading from './components/LOADING/LOADING';
import { LoadingFalse, RetrieveToken, TokenLog} from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPin from "./components/Login/UserPin"
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import TabNavFooter from './components/TabNavFooter/TabNavFooter'
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import PasswordReset from './components/PasswordRecovery/PasswordReset';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
import ValidateEmail from './components/Register/ValidateEmail';
import { IP_HOST, DEPLOYED_BACKEND_URL } from "@env"

import axios from "axios";
axios.defaults.baseURL = DEPLOYED_BACKEND_URL

const Stack = createStackNavigator();

export default function Index({navigation}) {
const blockChain = useSelector(state => state.blockChain)
const [themeSelect, setThemeSelect] = useState({})


React.useEffect(()=>{
  
  if(blockChain === "stellar"){

   let theme = extendTheme({
      colors: {
        // Add new color
        theme: {
          50: '#FFFFFF',
          100: '#18181b',
          150: "#27272a",
          200: '#6ee7b7',
          300: '#059669',
          400: '#064e3b',
          500: '#059669',
         
        },
        // Redefinig only one shade, rest of the color will remain same
      },
      config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: 'dark',
      },
    });

   setThemeSelect(theme)
  }else if(blockChain === "ethereum"){

  let  theme = extendTheme({
      colors: {
        // Add new color
        theme: {
          50: '#FFFFFF',
          100: '#18181b',
          150: "#27272a",
          200: '#fda4af',
          300: '#e11d48',
          400: '#881337',
         
        },
        // Redefinig only one shade, rest of the color will remain same
      }
      
    });
   
    setThemeSelect(theme)
  }



},[blockChain])

const dispatch = useDispatch();
let userToken =useSelector(state => state.userToken);

  const [logged, setLogged] = useState(false);
  const tokenLogged = useSelector(state => state.tokenLogged);
  const log = useSelector(state => state.Log);
  let isLoading = useSelector(state => state.isLoading);
 
  useEffect(() => {
    isLogged()
  }, [log])

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
        if (userToken !== null) {
          dispatch(TokenLog());
          dispatch(LoadingFalse());
        } else {
          dispatch(RetrieveToken(userToken));
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000); 
  }, [])


  if(isLoading) { return (
                  <>
                  <Loading/>
                  </>
  )
  }

  if(tokenLogged === true) {
    return (
      <>
      <UserPin/>
      </>
    )
  }

  return ( 

    <NativeBaseProvider theme={themeSelect} >
      {    console.log(blockChain)}
      <NavigationContainer>
        {!logged ? <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
    presentation="modal" >
                      <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                      <Stack.Screen name="Login" component={Login}/>
                      <Stack.Screen name="Register" component={Register}/>
                      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>
                      <Stack.Screen name="PasswordReset" component={PasswordReset}/>
                      <Stack.Screen name="ValidateEmail" component={ValidateEmail}/>
                   </Stack.Navigator>
    : 
                   <TabNavFooter />
                   }
      </NavigationContainer>
      </NativeBaseProvider>
  )
}









