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
import { Log, TokenLogOut, TOKEN_LOGOUT } from '../../redux/actions';


export default function UserPin () {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [pin,setPin] = useState(null);
    const [error, setError] = useState("");
    let userToken = useSelector(state => state.userToken)
    
    useEffect(() => {
        validatePin(pin)? setError("") : setError("Please enter a 6-digit pin, only numbers are accepted")
    },[pin]) 
    
   function handleSubmit(){
        setMessage("Loading...");
          if(error === ""){
            if(pin !== NaN){
              console.log(pin);
                if (parseInt(pin) === 123456) {
                        dispatch(Log(userToken));
                        setMessage("Sign in succeeded.");
                        dispatch(TokenLogOut());                    
                    }
                 else {
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