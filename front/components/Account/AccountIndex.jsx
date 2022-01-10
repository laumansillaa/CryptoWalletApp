
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Help from '../Help/Help';
import MyData from '../MyData/MyData';
import MyTags from "../MyTags/MyTags";
import Security from '../Security/Security';
import Settings from '../Settings/Settings';
import Account from './Account';
import EditDataUser from "../EditDataUser/EditDataUser";

const Stack = createNativeStackNavigator();

export default function AccountIndex() {
    return (
        <Stack.Navigator initialRouteName='Account'>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="MyData" component={MyData}/>
        <Stack.Screen name="MyTags" component={MyTags}/>
        <Stack.Screen name="Security" component={Security}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Help" component={Help}/>
        <Stack.Screen name="EditDataUser" component={EditDataUser}/>
      </Stack.Navigator>
    );
  }