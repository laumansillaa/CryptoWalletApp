import * as React from 'react';
import { Text, Button } from 'react-native';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account({ navigation }) {

  const dispatch = useDispatch();

  async function onLogout () {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(Logout());
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Button title='My Data' onPress={() => navigation.navigate("MyData")} />
      <Button title="My tags" onPress={() => navigation.navigate("MyTags")} />
      <Button title="Security" onPress={() => navigation.navigate("Security")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <Button title="Log out" onPress={onLogout} /> 
    </>
  );
}