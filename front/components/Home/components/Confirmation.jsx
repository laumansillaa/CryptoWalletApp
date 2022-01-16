import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { Box as NBBox, NativeBaseProvider, Center } from 'native-base';

const Box = (props) => {
  return <NBBox m="2" borderRadius="md" bg="primary.600" {...props} />
}

export default function Confirmation({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Confirmation Screen</Text>
            <Button
                onPress={() => navigation.navigate('HomeIndex')}
                title="volver"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}