import * as React from 'react';
import UserCriptos from "./UserCriptos"
import Home from "./Home"
import Confirmation from './components/Confirmation';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Transfer from './components/Transfer';
import Sell from "./components/Sell"
import BalanceUser from "./components/BalanceUser"
import StakingUser from './components/StakingUser';
import CardCripto from '../HeaderCurrencies/CardCripto';
import BuyCurrencie from '../HeaderCurrencies/BuyCurrencie';
import OperationCurrencies from '../HeaderCurrencies/OperationCurrencies';
import MercadoPago from './components/MercadoPago';
const Stack = createStackNavigator();

export default function HomeIndex() {
  return (
    <Stack.Navigator initialRouteName='HomeIndex' screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
      presentation="modal" >
      <Stack.Screen name="HomeIndex" component={Home} />
      <Stack.Screen name="UserCriptos" component={UserCriptos} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
  
      <Stack.Screen name="StakingUser" component={StakingUser}/>
      
      <Stack.Screen name="BalanceUser" component={BalanceUser}/>
      <Stack.Screen name="MercadoPago" component={MercadoPago} />
    </Stack.Navigator>
  );
}