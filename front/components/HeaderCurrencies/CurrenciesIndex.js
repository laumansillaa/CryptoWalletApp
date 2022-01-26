import * as React from 'react';
import HeaderCurrencies from './HeaderCurrencies';
import CardCripto from "./CardCripto"
import BuyCurrencie from './BuyCurrencie';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import ChatBot from '../ChatBot/ChatBot';
import { Box } from 'native-base';
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import OperationCurrencies from './OperationCurrencies';
import Staking from '../Home/components/Staking';
import Sell from '../Home/components/Sell';
import Transfer from '../Home/components/Transfer';
const Stack = createStackNavigator();


export default function CurrenciesIndex() {
  return (
    <Stack.Navigator initialRouteName='CurrenciesIndex' screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
      presentation="modal" >
        <Stack.Screen name="OperationCurrencies" component={OperationCurrencies} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="CurrenciesIndex" component={HeaderCurrencies} />
      <Stack.Screen name="UserTransfer" component={Transfer}/>
      <Stack.Screen name="UserSell" component={Sell}/>
      <Stack.Screen name="CardCripto" component={CardCripto} />
      <Stack.Screen name="BuyCurrencie" component={BuyCurrencie} />
      <Stack.Screen name="StakingCurrencie" component={Staking} />
    </Stack.Navigator>
  );
}