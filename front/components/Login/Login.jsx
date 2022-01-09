import React, { useState } from "react";
import { Text, View, TextInput, Image, StyleSheet, Button} from "react-native";


export default function Login ({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const styles = StyleSheet.create({
        logo: {
          width: 200,
          height: 200,
        },
        container: {
            flex: 1,
            alignItems: "center"
            
        },
      });
    
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
            source={require("../../assets/icon.png")}/>
            <Text>Put your data pls</Text>
            <TextInput placeholder="email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="password"  value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Button title="Log in"/ >
            <Button title="Create a new account" onPress={() => navigation.navigate("Register")}/>
            {/* <Button title="register with google"/> */}
            <Button title="Home" onPress={() => navigation.navigate("Home")}/>

        </View>

    )
}