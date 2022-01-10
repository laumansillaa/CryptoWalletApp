import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Currencies from '../Currencies/Currencies';
import Account from '../Account/Account';
import HeaderUser from '../HeaderUser/HeaderUser';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
    
  );
}