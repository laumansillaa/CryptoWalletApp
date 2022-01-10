import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from "./redux/store";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import MyTags from './components/Mytags/MyTags';
import MyData from './components/MyData/MyData';
import Security from './components/Security/Security';
import Settings from './components/Settings/Settings';
import Help from './components/Help/Help'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogOut from './components/LogOut/LogOut';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="MyData" component={MyData}/>
          <Stack.Screen name="MyTags" component={MyTags}/>
          <Stack.Screen name="Security" component={Security}/>
          <Stack.Screen name="Settings" component={Settings}/>
          <Stack.Screen name="Help" component={Help}/>
          <Stack.Screen name="LogOut" component={LogOut}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
