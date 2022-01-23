import * as React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Contacts from './Contacts';
import Contact from './Contact';
import AddContact from './AddContact';
import ContactCard from './ContactCard';

const Stack = createStackNavigator();

export default function ContactsIndex() {
  return (
    <Stack.Navigator initialRouteName='ContactsIndex' screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }}
      presentation="modal"
    >
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="ContactCard" component={ContactCard} />
    </Stack.Navigator>
  );
} 