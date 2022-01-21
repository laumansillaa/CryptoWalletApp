import { Button, Center, Container, FormControl, Icon, Input, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { validateEmail, validatePassword } from "../Utils/Utils";


export default function PasswordRecovery() {
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        email:""
        });
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [tokenEmail, setTokenEmail] = useState("");
    const [tokenPassword, setTokenPassword] = useState("");

    
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
        // /password/tokenrequest

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
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    {error.email}
                    </FormControl.ErrorMessage>  
                    <Button onPress={generateToken} size="sm">Generate a Token</Button>
                    <Text>Insert the Token</Text>
                    <Input placeholder="Token" value={tokenPassword}/>
                    <Button onPress={submitToken} size="sm">Submit</Button> 
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