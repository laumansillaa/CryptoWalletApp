
import { StyleSheet, } from 'react-native';

import {  NativeBaseProvider, Stack, Input,  FormControl,WarningOutlineIcon,Heading,Button } from 'native-base';

import { useState, useEffect } from 'react';
import { validateEmail, validateNumber, validatePassword, validateString, validatePin } from '../Utils/Utils';
export default function Register() {


const [state,setState] = useState({
  firstname: "",
  lastname: "",
  email:"",
  phone:"",
  password:"",
  pin:""

})
const [error, setError] = useState({
  firstName: "",
  lastName: "",
  email:"",
  phone:"",
  password:"",
  pin:""

})

function validateData (arg){


  switch(arg){
    case "firstname":
     validateString(state.firstname)? setError({...error, firstName: ""}):setError({...error, firstName:"Please enter a valid firstname without special characters"});
    break;
    case "lastname":
      validateString(state.lastname)? setError({...error, lastName: ""}):setError({...error, lastName:"Please enter a valid firstname without special characters"});
    break;
    case "email":
      validateEmail(state.email)? setError({...error, email: ""}):setError({...error, email:"Please enter a valid email"});
    break;
    case "phone":
      validateNumber(state.phone)? setError({...error, phone: ""}):setError({...error, phone:"Please just enter numbers"});
    break;
    case "password":
      validatePassword(state.password)? setError({...error, password: ""}):setError({...error, password:"Please enter a 6 to 16 digit password with at least one number and one capital letter"});
    break;
    case "pin":
      validatePin(state.pin)? setError({...error, pin: ""}):setError({...error, pin:"Please enter a 6-digit pin, only numbers are accepted"});
    break;
  }

}


useEffect(()=>{validateData("firstname")},[state.firstname])
useEffect(()=>{validateData("lastname")},[state.lastname])
useEffect(()=>{validateData("phone")},[state.phone])
useEffect(()=>{validateData("password")},[state.password])
useEffect(()=>{validateData("email")},[state.email])
useEffect(()=>{validateData("pin")},[state.pin])
 


const handleChange = (e, atr)=>{

setState({...state, [atr]: e})}


function handleSubmit(){
    if(!error.firstName&&!error.lastName&&!error.email&&!error.phone&&!error.password&&!error.pin){
    console.log("registro ok")

  }

}




  return (
  <NativeBaseProvider>
    <FormControl
    isInvalid
    w={{
      base: "100%",
      md: "25%",}}
    style={styles.container}>


          <Heading>Register </Heading>
          
      <Stack
      space={4}
      w={{
        base: "85%",
        md: "25%",
      }}
      h={{base: "50%",
        md:"25%"}}
      >  
        
        <Input variant="filled"   placeholder="Enter Name" onChangeText={(e)=>handleChange(e,"firstname")} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.firstName}
        </FormControl.ErrorMessage>  
     
        <Input variant="filled"  placeholder="Enter Last Name" onChangeText={(e)=>handleChange(e,"lastname")}/> 
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.lastName}
        </FormControl.ErrorMessage>   
        
        <Input  variant="filled" placeholder="Enter Email" onChangeText={(e)=>handleChange(e,"email")} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.email}
        </FormControl.ErrorMessage>  
        
        <Input  variant="filled"  placeholder="Enter Phone" onChangeText={(e)=>handleChange(e,"phone")} /> 
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.phone}
        </FormControl.ErrorMessage>   
    
        <Input variant="filled"  placeholder="Enter Password" onChangeText={(e)=>handleChange(e,"password")} password={true} secureTextEntry={true}
         />  
           <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.password}
        </FormControl.ErrorMessage>  

        <Input variant="filled"  placeholder="Enter 6 digit pin" onChangeText={(e)=>handleChange(e,"pin")} password={true} secureTextEntry={true}
         />  
           <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.pin}
        </FormControl.ErrorMessage>  

        <Button onPress={handleSubmit}>Next</Button>

      </Stack>
     
  
  </FormControl>
  </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08b6ff',
    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});