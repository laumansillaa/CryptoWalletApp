import * as React from 'react';
import { Text, View } from 'react-native';

const transaction=['BTC USD$ 46.767,34', 'ETH USD$ 3.897,78', 'ADA USD$ 1.34']

export default function Currencies() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Currencies Screen</Text>
    </View>
  );
}