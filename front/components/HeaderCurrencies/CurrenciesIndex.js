import * as React from 'react';
import HeaderCurrencies from './HeaderCurrencies';
import CardCripto from "./CardCripto"
import BuyCurrencie from './BuyCurrencie';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
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
      <Stack.Screen name="CurrenciesIndex" component={HeaderCurrencies} />
      <Stack.Screen name="CardCripto" component={CardCripto} />
      <Stack.Screen name="BuyCurrencie" component={BuyCurrencie} />
    </Stack.Navigator>
  );
}