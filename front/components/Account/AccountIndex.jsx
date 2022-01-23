import * as React from 'react';
import Help from '../Help/Help';
import MyData from '../MyData/MyData';
import MyTags from "../MyTags/MyTags";
import Security from '../Security/Security';
import Settings from '../Settings/Settings';
import Account from './Account';
import EditDataUser from "../EditDataUser/EditDataUser";
import HeaderUser from '../HeaderUser/HeaderUser'
import ContactsIndex from '../Contacts/ContactsIndex';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function AccountIndex() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator initialRouteName='Account' screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
      presentation="modal">
      <Stack.Screen name="AccountComponent" component={Account} options={{ headerTitle: () => <HeaderUser /> }} />
      <Stack.Screen name="MyData" component={MyData} />
      <Stack.Screen name="MyTags" component={MyTags} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="EditDataUser" component={EditDataUser} />
      <Stack.Screen name="ContactsIndex" component={ContactsIndex} />
    </Stack.Navigator>
  );
}