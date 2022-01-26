import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Center, Container, FormControl, Icon, Input, Stack, Text, WarningOutlineIcon } from "native-base";
import { validatePassword } from "../Utils/Utils";

export default function PasswordReset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState({
        password:"",
        confirmPassword: "",
    });

    function validateData(arg){
        switch(arg){
            case "password":
                validatePassword(password) 
                    ? setError({...error, password: ""}) 
                    : setError({...error, password: "Please enter a 6 to 16 digit password with at least one number and one capital letter."});
            break;

            case "confirmPassword":
                validatePassword(confirmPassword)
                    ? setError({...error, confirmPassword: ""})
                    : setError({...error, confirmPassword: "Please enter a 6 to 16 digit password with at least one number and one capital letter."});
            break;
        }
    }

    async function resetPassword() {
        setMessage("Loading...");
    }

    useEffect(()=>{validateData("password")},[password]);

    useEffect(()=>{validateData("confirmPassword")},[confirmPassword]);

    return (
        <>
            <Container style={styles.container}>
                <Center>
                    <FormControl>
                    <Stack>
                        <Text>Put your new password</Text>
                        <Input placeholder="password"  value={password} onChangeText={setPassword} type="password"/>
                        <FormControl.HelperText>
                        {error.password}
                        </FormControl.HelperText>  
                        <Input placeholder="confirm your password"  value={confirmPassword} onChangeText={setConfirmPassword} type="password"/>
                        <FormControl.HelperText>
                        {error.confirmPassword}
                        </FormControl.HelperText>
                        { password === confirmPassword ? <Text>the passwords match</Text> : 
                        <Text>the passwords must match</Text>}
                        { error.password === "" ? <Button onPress={resetPassword} size="sm">Reset the password</Button> : 
                        <Text>The password is not right</Text> } 
                        <Text>{message}</Text>
                                            
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
