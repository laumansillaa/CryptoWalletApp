import { StyleSheet } from 'react-native';
import { Provider} from 'react-redux';

import * as React from 'react';

import store from "./redux/store";
import Index from './index';

export default function App() {

  return ( 
    <Provider store={store}>
      <Index />
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
