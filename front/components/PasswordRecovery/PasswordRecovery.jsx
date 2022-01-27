import { Box, Button, Center, Container, FormControl, Icon, Input, Stack, Text, WarningOutlineIcon, Divider } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { validateEmail } from "../Utils/Utils";
import axios from "axios";
import {IP_HOST} from "@env";
import {Dimensions} from 'react-native';


export default function PasswordRecovery({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        email:""
        });
    const [emailSent, setEmailSent] = useState(false);
    const [message, setMessage] = useState("");

    
    function validateData (arg){
        switch(arg){
          case "email":
            validateEmail(email)? setError({...error, email: ""}):setError({...error, email:"Please enter a valid email"});
          break;
        }
      }
    
    useEffect(()=>{validateData("email")},[email]);

    const generateToken = async () => {
        setMessage("Loading...");
        try {
            await axios({
                method: "post",
                data: {
                  email: email,
                },
                withCredentials: true,
                url: `http://${IP_HOST}:3001/password/tokenrequest`,
              });
            setEmailSent(true);
        } catch (e) {console.log(e)};

    }
    
    return (
        <>
        <Box style={styles.container}  height={windowsHeight} >
            <Center>
                <FormControl >
                <Stack>
                    <Text fontSize="xl">Put your email</Text>

                    <Divider my="1" bg='#ecfeff' />

                    <Input placeholder="email" value={email} onChangeText={setEmail} 
                    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} 
                    color='coolGray.900' 
                    backgroundColor= '#e4e4e7' 
                    size= "lg" borderRadius= "4px"
                    borderColor= "#fafafa" 
                    borderWidth="2"/>
                    {error.email !== "Please enter a valid email" && email !== "" ? 
                    
                    <Button onPress={generateToken} mt= "20px" size="sm" 
                    borderRadius= "4px" 
                    bg= 'theme.50' 
                    color= 'theme.100'
                    _text={{fontSize:"md"}} 
                    borderColor= "darkBlue.50" 
                    borderWidth="1">Generate a Token</Button> :

                    <FormControl.HelperText leftIcon={<WarningOutlineIcon size="md" />}>
                    {error.email} 
                    </FormControl.HelperText> }
                    <FormControl.HelperText>
                    {message}
                    </FormControl.HelperText>
                    <Divider my="2" bg='#ecfeff' /> 
                    <Button onPress={() => navigation.navigate("PasswordReset")} size="sm" 
                    backgroundColor= 'darkBlue.600' borderRadius= "4px"  _text={{fontSize:"md"}} 
                    borderColor= "darkBlue.50" borderWidth="1">Reset Password</Button>                 
                </Stack>

                <Divider my="4" bg='#ecfeff' />
                
                <Button onPress={() => navigation.navigate("Login")} 
                mt= "40px" 
                size="sm"  
                borderRadius= "4px"
                leftIcon= {<Icon as={<AntDesign name="back" size={5} color="black" />} />} 
                h="9" w= "320" 
                _text={{fontSize:"md"}} 
                borderColor= "darkBlue.50" 
                borderWidth="1" 
                fontSize="xl" 
                bg= 'theme.50' 
                color= 'theme.100' >Go to back</Button>
                </FormControl>
            </Center>
        </Box>
        </>
    )
}

const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#18181b',
      
      alignItems: 'center',
      justifyContent: 'center',
      
     
    },
  });