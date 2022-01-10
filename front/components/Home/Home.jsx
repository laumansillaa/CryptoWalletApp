import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Currencies from '../Currencies/Currencies';
import Account from '../Account/Account';
import HeaderUser from '../HeaderUser/HeaderUser';
import HeaderCurrencies from '../HeaderCurrencies/HeaderCurrencies'

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Currencies" component={Currencies} options= {{headerTitle:()=><HeaderCurrencies/>}}/>
        <Tab.Screen name="Account" component={Account} options={{headerTitle:()=><HeaderUser/>}}/>
    </Tab.Navigator>
    
  );
}