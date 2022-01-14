
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import UserCriptos from "./UserCriptos"
import Home from "./Home"
const Stack = createNativeStackNavigator();

export default function HomeIndex() {
  return (
    <Stack.Navigator initialRouteName='HomeIndex' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeIndex" component={Home} />
      <Stack.Screen name="UserCriptos" component={UserCriptos} />
    </Stack.Navigator>
  );
}