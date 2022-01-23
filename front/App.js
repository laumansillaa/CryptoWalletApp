//import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Provider} from 'react-redux';

import * as React from 'react';

import store from "./redux/store";
import Index from './index';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
export default function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };
  
  // extend the theme
  const customTheme = extendTheme({ config });
  return ( 
    <Provider store={store}>
    <NativeBaseProvider theme={customTheme}>
      <Index />
      </NativeBaseProvider>
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
