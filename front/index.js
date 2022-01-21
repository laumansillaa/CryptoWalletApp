import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import SplashScreen from './components/SplashScreen/SplashScreen';
import Loading from './components/LOADING/LOADING';
import { LoadingFalse, RetrieveToken, TokenLog, TOKEN_LOG } from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPin from "./components/Login/UserPin"


import Footer from '../front/components/Footer/Footer'

import TabNavFooter from './components/TabNavFooter/TabNavFooter'
import ButtonChatBot from './components/ChatBot/ButtonChatBot';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
const Stack = createNativeStackNavigator();

export default function Index() {

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
   
      <NavigationContainer>
        {!logged ? <Stack.Navigator initialRouteName='SplashScreen'>
                      <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                      <Stack.Screen name="Login" component={Login}/>
                      <Stack.Screen name="Register" component={Register}/>
                      {/* <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/> */}
                   </Stack.Navigator>
    : 
                   <TabNavFooter/>
                   }
      </NavigationContainer>
  )
}
//   return (

//     <NavigationContainer>
//       {!logged ? <Stack.Navigator initialRouteName='Login'>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Register" component={Register} />
//       </Stack.Navigator>
//         : 
        
//       }</NavigationContainer>
//   );
// }









