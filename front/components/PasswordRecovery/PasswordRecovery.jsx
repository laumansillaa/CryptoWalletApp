import { Box, Button, Center, Container, FormControl, Icon, Input, Stack, Text, WarningOutlineIcon } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { validateEmail } from "../Utils/Utils";
import axios from "axios";


export default function PasswordRecovery({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        email:""
        });
    const [emailSent, setEmailSent] = useState(false);
    const [message, setMessage] = useState("");
    const [messageSubmit, setMessageSubmit] = useState("");

    const [password, setPassword] = useState("");
    const [tokenPassword, setTokenPassword] = useState("");
    const [tokenValidate, setTokenValidate] = useState(false);

    
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
            // await axios.post(`http://${IP_HOST}:3001/password/tokenrequest`, {email: email});
            setEmailSent(true);
        } catch (e) {console.log(e)};

    }

    const submitToken = async () => {
        setMessageSubmit("Loading...");
        try {
            // await axios.post(`http://${IP_HOST}:3001/password/tokenrequest`, {email: email});
            setTokenValidate(true);
        } catch (e) {console.log(e)};
    }
    
    return (
        <>
        <Container style={styles.container}>
            <Center>
                <FormControl>
                <Stack>
                    <Text>Put your email for generate a Token</Text>
                    <Input placeholder="email" value={email} onChangeText={setEmail} InputLeftElement={
                        <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} />
                    {error.email !== "Please enter a valid email" && email !== "" ? 
                    <Button onPress={generateToken} size="sm">Generate a Token</Button> :
                    <FormControl.HelperText>
                    {error.email}
                    </FormControl.HelperText>}
                    <FormControl.HelperText>
                    {message}
                    </FormControl.HelperText>
                    <Text>Insert the Token</Text>
                    <Input placeholder="Token" value={tokenPassword} onChangeText={setTokenPassword}/>
                    <Button onPress={submitToken} size="sm">Submit</Button>
                    <FormControl.HelperText>
                    {messageSubmit}
                    </FormControl.HelperText>
                    { tokenValidate ? 
                     <Button onPress={() => navigation.navigate("PasswordReset")} size="sm" >Reset Password</Button>
                     : <Text>Validate the token</Text>}
                    
                </Stack>
                </FormControl>
            </Center>
        </Container>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#08b6ff',
      
      alignItems: 'center',
      justifyContent: 'center',
     
    },
  });