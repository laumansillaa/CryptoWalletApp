import React, { useState } from "react";
import { Text, View, TextInput, Image, StyleSheet, Button} from "react-native";
import {IP_HOST} from "@env"
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLoginUser } from "../../redux/actions";
export default function Login ({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    
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

    async function handleSubmit(){
        let obj={
            email: email,
            password: password

        }
        try{
            await axios.post(`http://${IP_HOST}:3001/session/localSignin`, obj)
            dispatch(getLoginUser(obj))
            navigation.navigate("Home")

        }catch(e){
            console.log("Fallo en el login")

        }
       

      }


    
    
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
            source={require("../../assets/icon.png")}/>
            <Text>Put your data pls</Text>
            <TextInput placeholder="email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="password"  value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Button title="Log in" onPress={handleSubmit}/>
            <Button title="Create a new account" onPress={() => navigation.navigate("Register")}/>
            {/* <Button title="register with google"/> */}
            <Button title="Home" onPress={() => navigation.navigate("Home")}/>

        </View>

    )
}