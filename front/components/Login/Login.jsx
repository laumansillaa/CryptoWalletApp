import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, StyleSheet, Button} from "react-native";
import axios from "axios";
import { Log } from "../../redux/actions";
import {IP_HOST} from "@env"
import { useDispatch, useSelector } from "react-redux";


export default function Login ({ navigation }) {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const log = useSelector(state => state.Log);

    const onLogin = async e => {
        let obj = {
          email: email,
          password: password,
        };
        await axios.post(`http://${IP_HOST}:3001/session/localSignin`, obj)
        .then(() => dispatch(Log()))
        .catch(err => console.log(err))
      
    }

    useEffect(() => {
      console.log("fallo en el login");
  }, [log]);
    
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
            <Button title="Log in" onPress={onLogin}/>
            <Button title="Create a new account" onPress={() => navigation.navigate("Register")}/>
            {/* <Button title="register with google"/> */}
            {/* <Button title="Home" onPress={() => navigation.navigate("Home")}/> */}

        </View>

    )
}