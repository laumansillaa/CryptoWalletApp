
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import HeaderCurrencies from './HeaderCurrencies';
import CardCripto from "./CardCripto"
const Stack = createNativeStackNavigator();

export default function CurrenciesIndex() {
  return (
    <Stack.Navigator initialRouteName='CurrenciesIndex' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="CurrenciesIndex" component={HeaderCurrencies} />
      <Stack.Screen name="CardCripto" component={CardCripto} />
    </Stack.Navigator>
  );
}