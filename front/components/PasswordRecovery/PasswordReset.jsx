import { Button, Center, Container, FormControl, Icon, Input, Stack, Text, WarningOutlineIcon } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { validatePassword } from "../Utils/Utils";
import {IP_HOST} from "@env";
import axios from "axios";

export default function PasswordReset() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState({
        password:"",
        confirmPassword: "",
        });
    const [tokenPassword, setTokenPassword] = useState("");
    const [tokenValidate, setTokenValidate] = useState(false);

    function validateData (arg){
        switch(arg){
            case "password":
                validatePassword(password)? setError({...error, password: ""}):setError({...error, password:"Please enter a 6 to 16 digit password with at least one number and one capital letter"});
            break;
            case "confirmPassword":
                validatePassword(confirmPassword)? setError({...error, confirmPassword: ""}):setError({...error, confirmPassword:"Please enter a 6 to 16 digit password with at least one number and one capital letter"});
            break;
        }
    }

    useEffect(()=>{validateData("password")},[password]);
    useEffect(()=>{validateData("confirmPassword")},[confirmPassword]);

    const resetPassword = async () => {
        setMessage("Loading...");
        try {
             await axios({
                method: "post",
                data: {
                  token: tokenPassword,
                  password: password,
                  confirmPassword: confirmPassword,
                },
                withCredentials: true,
                url: `http://${IP_HOST}:3001/password/resetpassword`,
              });
            setTokenValidate(true);
            setMessage("password changed")
        } catch (e) {console.log(e)};
    }

    return (
        <>
        <Container style={styles.container}>
            <Center>
                <FormControl>
                <Stack>
                    <Text>Insert the Token</Text>
                    <Input placeholder="Token" value={tokenPassword} onChangeText={setTokenPassword}/>
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