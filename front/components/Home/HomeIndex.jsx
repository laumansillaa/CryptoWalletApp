
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import UserCriptos from "./UserCriptos"
import Home from "./Home"
import Confirmation from './components/Confirmation';
import Transfer from './components/Transfer';
import Sell from "./components/Sell"
const Stack = createNativeStackNavigator();

export default function HomeIndex() {
  return (
    <Stack.Navigator initialRouteName='HomeIndex' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeIndex" component={Home} />
      <Stack.Screen name="UserCriptos" component={UserCriptos} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="UserTransfer" component={Transfer}/>
      <Stack.Screen name="UserSell" component={Sell}/>
    </Stack.Navigator>
  );
}