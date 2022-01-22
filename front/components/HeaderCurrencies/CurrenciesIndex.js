
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import HeaderCurrencies from './HeaderCurrencies';
import CardCripto from "./CardCripto"
import BuyCurrencie from './BuyCurrencie';
import ChatBot from '../ChatBot/ChatBot';
import { Box } from 'native-base';
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import OperationCurrencies from './OperationCurrencies';
const Stack = createNativeStackNavigator();

export default function CurrenciesIndex() {
  return (
    <Stack.Navigator initialRouteName='CurrenciesIndex' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="CurrenciesIndex" component={HeaderCurrencies} />
      <Stack.Screen name="CardCripto" component={CardCripto} />
      <Stack.Screen name="BuyCurrencie" component={BuyCurrencie} />
      <Stack.Screen name="OperationCurrencies" component={OperationCurrencies} />
    </Stack.Navigator>
  );
}