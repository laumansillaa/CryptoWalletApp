import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, StyleSheet, Button} from "react-native";
import axios from "axios";
import { Log } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


export default function Login ({ navigation }) {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const log = useSelector(state => state.Log);

    const onLogin = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3001/session/localSignin", {
            "email": email,
            "password": password
        }).then(function (response) {
            console.log(response);
            if(response.status === 200) {
              dispatch(Log)
              console.log(log);
            }
            console.log(response.status);
            console.log(log);
             })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
      console.log(log);
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
            <Button title="Create a new account" onPress={() => navigation.navigate("Register")}/>
            {/* <Button title="register with google"/> */}
            <Button title="Home" onPress={() => navigation.navigate("Home")}/>

        </View>

    )
}