import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';

export default function Account({ navigation }) {

  const dispatch = useDispatch();

  function onLogout() {
    dispatch(Logout());
  }

  return (
    <>{/* 
      <Button title='My Data' onPress={() => navigation.navigate("MyData")} />
      <Button title="My tags" onPress={() => navigation.navigate("MyTags")} />
      <Button title="Security" onPress={() => navigation.navigate("Security")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <Button title="Log out" onPress={onLogout} /> */}
      <Text>Account screen</Text>
    </>
  );
}