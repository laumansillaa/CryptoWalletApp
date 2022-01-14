import React, { useState, useEffect } from "react";
import axios from "axios";
import { Log } from "../../redux/actions";
import {IP_HOST} from "@env"
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center, Container, Image, Box, FormControl, Input, Button, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons"




export default function Login ({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const log = useSelector(state => state.Log);
    let userToken = useSelector(state => state.userToken);

    const onLogin = async (e) => {
      try {
        userToken = null;
        const response = await axios({
          method: "post",
          data: {
            email: email,
            password: password,
          },
          withCredentials: true,
          url: `http://${IP_HOST}:3001/session/localSignin`,
        });
        userToken = "loggety logged";     
        await AsyncStorage.setItem('userToken', userToken);
        dispatch(Log(userToken));  
      } catch (error) { console.error(error) }
    };

    const onGoogleLogin = async (e) => {
      try {
        window.open(`http://${IP_HOST}:3001/session/googleSignin`, '_self')
        dispatch(Log())
      } catch (error) { console.error(error) }
    }

    


    
    
    return (
        <Container >
            <Image width="200px" height="200px"
            source={require("../../assets/icon.png")} alt="logo"/>            
            <FormControl isRequired/>
            <FormControl.Label>Put your data pls</FormControl.Label>
            <Input placeholder="email" value={email} onChangeText={setEmail} InputLeftElement={
          <Icon
            as={<MaterialIcons name="person" />}
            size={5}
            ml="2"
            color="muted.400"
           />} />
            <Input placeholder="password"  value={password} onChangeText={setPassword} type="password" InputRightElement={
          <Icon
            as={<MaterialIcons name="visibility-off" />}
            size={5}
            mr="2"
            color="muted.400"
          />
        } />
            <Button onPress={onLogin} size="sm">Log in</Button>            
            <Button  onPress={onGoogleLogin} size="sm">Log in with Google</Button>
            <Button onPress={() => navigation.navigate("Register")} size="sm">Create a new account</Button>       
        </Container>

    )
}
