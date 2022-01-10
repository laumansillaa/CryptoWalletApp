import * as React from 'react';
import { Button } from 'react-native';

export default function Account({ navigation }) {
  return (
    <>
      <Button title='My Data' onPress={() => navigation.navigate("MyData")} />
      <Button title="My tags" onPress={()=>navigation.navigate("MyTags")} />
      <Button title="Security" onPress={()=>navigation.navigate("Security")} />
      <Button title="Settings" onPress={()=>navigation.navigate("Settings")} />
      <Button title="Help" onPress={()=>navigation.navigate("Help")} />
      <Button title="Log out" onPress={()=>navigation.navigate("LogOut")} />
    </>
  );
}