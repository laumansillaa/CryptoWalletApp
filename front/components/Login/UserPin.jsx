import React, { useState } from 'react';
import {
  PinInput,
  Center,
  FormControl,
  NativeBaseProvider,
  Button,
  Input
} from 'native-base';
import { validatePin } from '../Utils/Utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';
import { getDataUser, Log, TokenLogOut, TOKEN_LOGOUT } from '../../redux/actions';
import axios from 'axios';
import { StyleSheet } from 'react-native';


export default function UserPin () {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [pin,setPin] = useState("");
    const [error, setError] = useState("");
    const userToken = useSelector(state => state.userToken);
    const userData = useSelector(state => state.userData); 
    
    
    useEffect(() => {
        validatePin(pin)? setError("") : setError("Please enter a 6-digit pin, only numbers are accepted");
        dispatch(getDataUser());
    },[pin]);
    
   function handleSubmit(){
        setMessage("Loading...");
          if(error === ""){
            if(pin !== ""){
                if (pin === userData?.pin) {
                        dispatch(Log(userToken));
                        setMessage("Sign in succeeded.");
                        dispatch(TokenLogOut());                   
                    }
                 else {
                    setMessage("Registration failed, try again")
                }            
              }else{
                setMessage("Please fill all fields");
              }
           
           }else{
            setMessage("Please review the warnings");
           }
      }


    return (
        <Center>
        <FormControl>
          <FormControl.Label>PIN</FormControl.Label>
          <Input placeholder="Enter password" type='password' value={pin} onChangeText={setPin} />
          <FormControl.HelperText>
            Put your pin for security
          </FormControl.HelperText>
          {<FormControl.HelperText>
            {error}
            </FormControl.HelperText>}
          <Button onPress={handleSubmit}>Enter the app</Button>
          {<FormControl.HelperText>
            {message}
            </FormControl.HelperText>}

        </FormControl>
      </Center>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000e21',
    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});