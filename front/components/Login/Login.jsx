import React, { useState, useEffect } from "react";
import { StyleSheet, } from 'react-native';
import axios from "axios";
import { Log } from "../../redux/actions";
import {IP_HOST} from "@env"
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Container, Image, FormControl, Input, Button, Icon, Heading, Stack, WarningOutlineIcon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons"
import { validateEmail, validatePassword } from "../Utils/Utils";




export default function Login ({ navigation }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const log = useSelector(state => state.Log);
    let userToken = useSelector(state => state.userToken);

    const [error, setError] = useState({
      email:"",
      password:"",
      })

    function validateData (arg){
      switch(arg){
        case "email":
          validateEmail(email)? setError({...error, email: ""}):setError({...error, email:"Please enter a valid email"});
        break;
        case "password":
          validatePassword(password)? setError({...error, password: ""}):setError({...error, password:"Please enter a 6 to 16 digit password with at least one number and one capital letter"});
        break;
      }
    }
    
    useEffect(()=>{validateData("password")},[password]);
    useEffect(()=>{validateData("email")},[email]);

    const onLogin = async (e) => {
        setMessage("Loading...");
          if(!error.email && !error.password){
      
            if(email && password){
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
                  setMessage("Log in succeeded.");
                } catch (error) {
                  setMessage("Registration failed, try again ");
                  console.error(error);
                }
              
              }else{
                setMessage("Please fill all fields");
              }
           
           }else{
            setMessage("Please review the warnings");
           }
    };

    const onGoogleLogin = async (e) => {
      try {
        window.open(`http://${IP_HOST}:3001/session/googleSignin`, '_self')
        dispatch(Log())
      } catch (error) { console.error(error) }
    };



    
    
    return (
            <FormControl isInvalid w={{base: "100%", md: "25%",}} style={styles.container}>
            <Image width="200px" height="200px"
            source={require("../../assets/icon.png")} alt="logo"/>            
            <Heading>Put your data pls </Heading>
            <Stack space={4} w={{base: "85%", md: "25%", }}>
            <Input placeholder="email" value={email} onChangeText={setEmail} InputLeftElement={
          <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} />
           <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
          {error.email}
        </FormControl.ErrorMessage>  
            <Input placeholder="password"  value={password} onChangeText={setPassword} type="password" 
            InputRightElement={<Icon as={<MaterialIcons name="visibility-off" />} size={5} mr="2" color="muted.400" />} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
          {error.password}
        </FormControl.ErrorMessage > 
            <Button onPress={onLogin} size="sm">Log in</Button> 
            <FormControl.HelperText>
            {message}
          </FormControl.HelperText>
            <Button  onPress={onGoogleLogin} size="sm">Log in with Google</Button>
            <Button onPress={() => navigation.navigate("Register")} size="sm">Create a new account</Button>       
          </Stack>
          </FormControl>           
           )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08b6ff',
    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});