import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Currencies from '../Currencies/Currencies';
import Account from '../Account/Account';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Currencies" component={Currencies}/>
        <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
    
  );
}