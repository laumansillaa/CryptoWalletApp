import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

export default function HeaderUser() {
  return (
    <View style={styles.container}>
      <Text>User Name</Text>
      <Image 
        style={styles.image}
      source={{uri:'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  image:{
      width: 30, 
      height: 30
    }
});
