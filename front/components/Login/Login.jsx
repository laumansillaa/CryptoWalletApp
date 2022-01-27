import React, { useState, useEffect } from "react";
import { StyleSheet, } from 'react-native';
import axios from "axios";
import { Log } from "../../redux/actions";
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Container, Image, FormControl, Input, Button, Icon, Heading, Stack, WarningOutlineIcon, Divider} from "native-base";
import { MaterialIcons, AntDesign, Fontisto, Ionicons } from "@expo/vector-icons"
import { validateEmail, validatePassword } from "../Utils/Utils";

import * as WebBrowser from 'expo-web-browser';


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
                    url: `${DEPLOYED_BACKEND_URL}session/localSignin`,
                  });
                  console.log(response)
                  userToken = email;     
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

        let result = await WebBrowser.openBrowserAsync(`https://jralvarezwindey-wallet-app.herokuapp.com/session/googleSignin`);
        
        dispatch(Log())
      } catch (error) { console.error(error) }
    };




//     const onGoogleLogin = async () => {
//       // gets the app's deep link
//       let redirectUrl = await Linking.getInitialURL();
//       // this should change depending on where the server is running
//       let authUrl = `http://localhost:3001/session/googleSignin`;

//       addLinkingListener();

//       try {
//         let authResult = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl)
//         // await this.setState({ authResult: authResult })
//       } catch (err) { console.error('ERROR:', err) }

//       removeLinkingListener();
//     }

//     const handleRedirect = async event => {
//       WebBrowser.dismissBrowser()
//     };

//     const addLinkingListener = () => {
//       Linking.addEventListener('url', handleRedirect)
//     }

//     const removeLinkingListener = () => {
//       Linking.removeEventListener('url', handleRedirect)
//     }


    
    
    return (
      
            <FormControl isInvalid w={{base: "100%", md: "25%",}} style={styles.container} >
            {/* <Image width="200px" height="200px"
            source={require("../../assets/icon.png")} alt="logo" />             */}
            
            <Stack space={4} w={{base: "85%", md: "25%", }} >
            <Input placeholder="Email" value={email} onChangeText={setEmail} 
            borderRadius= "4px" 
            InputLeftElement={<Icon as={<Ionicons name="person" size={24} color="black" />} 
            size={5} 
            ml="2" 
            color="muted.400"/>} 
            backgroundColor= 'theme.50'
            fontWeight='bold' 
            fontSize='14' 
            borderColor= "#dark.900" 
            borderWidth="2" 
            _text={{fontSize:"lg"}} 
            color='coolGray.900'/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
          {error.email}
        </FormControl.ErrorMessage>

            <Input placeholder="Password"  value={password} onChangeText={setPassword}  
            type="password" 
            borderRadius= "4px" 
            backgroundColor= 'theme.50' 
            color='coolGray.900'
            InputLeftElement={<Icon as={<AntDesign name="key" size={24} color="black" />} 
            size={5} 
            ml="2" 
            color="muted.400"/>} 
            fontWeight='bold' 
            fontSize='14' 
            borderColor= "#dark.900" 
            borderWidth="2" 
            _text={{fontSize:"lg"}}
            />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
          {error.password}
        </FormControl.ErrorMessage >

            <Divider my="1" bg='#ecfeff' />

            <Button onPress={onLogin} 
            size="sm" 
            borderRadius= "4px" 
            bg= 'theme.50' 
            color= 'theme.100'
            _text={{fontSize:"xl"}} 
            borderColor= "theme.150" 
            borderWidth="1" >Log in</Button> 
            <FormControl.HelperText>
            {message}
          </FormControl.HelperText>

            <Button  onPress={onGoogleLogin} 
            size="sm" 
            bg= 'theme.50' 
            color= 'theme.100'
            leftIcon= {<Icon as={<Fontisto name="google" size={8} color="black" />} />} 
            borderRadius= "4px" 
            _text={{fontSize:"md"}}
            borderColor= "theme.150" 
            borderWidth="1" >Log in with Google</Button>

            <Button onPress={() => navigation.navigate("Register")} 
            size="sm" 
            bg= 'theme.50' 
            color= 'theme.100'
            borderRadius= "4px"  
            _text={{fontSize:"md"}} 
            borderColor= "theme.150" 
            borderWidth="1" >Create account</Button>
            
            <Button onPress={() => navigation.navigate("PasswordRecovery")} 
            size="sm" 
            bg= 'theme.50' 
            color= 'theme.100'
            borderRadius= "4px"  
            _text={{fontSize:"md"}} 
            borderColor= "theme.150" 
            borderWidth="1" >Forgot password</Button>       
          </Stack>
          </FormControl>
                  
    )
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#18181b',    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
