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


export default function UserPin () {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [pin,setPin] = useState({
      pin: null
    })
    const [error, setError] = useState({
      pin: null
    });
    
    const handleChange = (e, atr)=>{
        setPin({...pin, [atr]: e})
    }
    
    useEffect(() => {
        validatePin(pin)? setError({pin:""}) : setError({pin:"Please enter a 6-digit pin, only numbers are accepted"})
    },[pin]) 
    
    async function handleSubmit(){
        setMessage("Loading...")
          if(error.pin === ""){
            if(pin){
                if (pin === 123456) {
                    try {
                        let userToken = await AsyncStorage.getItem('userToken');
                        dispatch(Log(userToken));
                        setMessage("Sign in succeeded.");
                    } catch (e) {
                        setMessage("Registration failed, try again ")
                    }
                } else {
                    setMessage("Registration failed, try again")
                }
                // try {
                // //    await axios.post(`http://${IP_HOST}:3001/session/signup`, state)
                //   setMessage("Sign in succeeded.");
                // } catch (error) {
                //   setMessage("Registration failed, try again ")
                // }
              
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
          <Input placeholder="Enter password" type='password' onChange={handleChange} />
          <FormControl.HelperText>
            Put your pin for security
          </FormControl.HelperText>
          {error.length < 3 ? <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage> : 
          <Button onPress={handleSubmit}>Enter the app</Button>}

        </FormControl>
      </Center>
    )
}