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

    const onLogin = async (e) => {
      try {
        const response = await axios({
          method: "post",
          data: {
            email: email,
            password: password,
          },
          withCredentials: true,
          url: `http://${IP_HOST}:3001/session/localSignin`,
        })
       
        dispatch(Log())
      } catch (error) { console.error(error) }
    };

    const onGoogleLogin = async (e) => {
      try {
        window.open(`http://${IP_HOST}:3001/session/googleSignin`, '_self')
        dispatch(Log())
      } catch (error) { console.error(error) }
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

    


    
    
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
            source={require("../../assets/icon.png")}/>
            <Text>Put your data pls</Text>
            <TextInput placeholder="email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="password"  value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Button title="Log in" onPress={onLogin}/>
            <Button title="Log in with Google" onPress={onGoogleLogin}/>
            <Button title="Create a new account" onPress={() => navigation.navigate("Register")}/>
            {/* <Button title="register with google"/> */}
            {/* <Button title="Home" onPress={() => navigation.navigate("Home")}/> */}

        </View>

    )
}
