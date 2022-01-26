import { Box, Button, Center,  Divider, FormControl, Icon, Input, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
        <Box style={styles.container} height={windowsHeight} >
            <Center>
                <FormControl>
                <Stack>
                    <Text>Insert the Token</Text>
                    <Input placeholder="Token" value={tokenPassword} onChangeText={setTokenPassword} color='coolGray.900' 
                    backgroundColor= 'darkBlue.50' size= "lg" borderRadius= "4px" InputLeftElement={
                    <Icon as={<AntDesign name="lock1" size={24} color="black" />} size={5} ml="2" color="muted.400" />} />
                    <Text>Put your new password</Text>
                    <Input placeholder="password"  value={password} onChangeText={setPassword} type="password"
                    color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" borderRadius= "4px"/>
                    <FormControl.HelperText >
                    {error.password}
                    </FormControl.HelperText>  
                    <Input placeholder="confirm your password"  value={confirmPassword} onChangeText={setConfirmPassword} type="password"
                    color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" borderRadius= "4px"/>
                    <FormControl.HelperText>
                    {error.confirmPassword}
                    </FormControl.HelperText>
                    { password === confirmPassword ? <Text>the passwords match</Text> : 
                    <Text>the passwords must match</Text>}
                    <Divider my="2" bg='#ecfeff' />
                    { error.password === "" ? <Button onPress={resetPassword} size="sm" backgroundColor= 'darkBlue.600'
                     borderRadius= "4px"  _text={{fontSize:"md"}} borderColor= "darkBlue.50" borderWidth="1">Reset the password</Button> : 
                    <Text>The password is not right</Text> } 
                    <Text>{message}</Text>
                                        
                </Stack>
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
      backgroundColor: '#000e21',
      
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
     
    },
  });