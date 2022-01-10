import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';

export default function Account() {

  const dispatch = useDispatch();

  function onLogout () {
    dispatch(Logout());
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Account Screen!</Text>
      <Button title="Log out" onPress={onLogout} />
    </View>
  );
}