
import { StyleSheet, Dimensions} from 'react-native';

import {  ScrollView, Stack, Input,  FormControl,WarningOutlineIcon,Heading,Button, Box, Divider } from 'native-base';

import { useState, useEffect } from 'react';
import { validateEmail, validateNumber, validatePassword, validateString, validatePin } from '../Utils/Utils';
import axios from "axios"
import {IP_HOST} from "@env"

export default function Register({navigation}) {

const [message, setMessage] = useState("");
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


async function handleSubmit(){
  setMessage("Loading...")
    if(!error.firstName&&!error.lastName&&!error.email&&!error.phone&&!error.password&&!error.pin){

      if(state.firstname&&state.lastname&&state.email&&state.phone&&state.password&&state.pin){
 
          try {
             await axios.post(`http://${IP_HOST}:3001/session/signup`, state)
            setMessage("Sign in succeeded.");
          } catch (error) {
            setMessage("Registration failed, try again ")
          }
        
        }else{
          setMessage("Please fill all fields");
        }
     
     }else{
      setMessage("Please review the warnings")
     }
}

  return (
    <Box height={windowsHeight} backgroundColor="coolGray.900">
      <ScrollView>
      <FormControl
      isInvalid
      width={{
        base: "100%",
        md: "25%",}}
      
      style={styles.container} >
        <Box>

        </Box>

            <Heading>Register </Heading>
            <Divider my="2" bg='#ecfeff' />
            
        <Stack
        space={4}
        width={{
          base: "85%",
          md: "25%",
        }}
        
        >  
          
          <Input variant="filled"  placeholder="Enter Name" onChangeText={(e)=>handleChange(e,"firstname")} 
          color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" fontWeight='bold' fontSize='12'/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.firstName}
          </FormControl.ErrorMessage>  
      
          <Input variant="filled"  placeholder="Enter Last Name" onChangeText={(e)=>handleChange(e,"lastname")} 
          color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" fontWeight='bold' fontSize='12'/> 
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.lastName}
          </FormControl.ErrorMessage>   
          
          <Input  variant="filled" placeholder="Enter Email" onChangeText={(e)=>handleChange(e,"email")} 
          color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" fontWeight='bold' fontSize='12' />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.email}
          </FormControl.ErrorMessage>  
          
          <Input  variant="filled"  placeholder="Enter Phone" onChangeText={(e)=>handleChange(e,"phone")} 
          color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" fontWeight='bold' fontSize='12'/> 
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.phone}
          </FormControl.ErrorMessage>   
      
          <Input variant="filled"  placeholder="Enter Password" onChangeText={(e)=>handleChange(e,"password")} password={true} secureTextEntry={true}
          backgroundColor= 'darkBlue.50' color='coolGray.900' size= "lg" fontWeight='bold' fontSize='12'
          />  
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.password}
          </FormControl.ErrorMessage>  

          <Input variant="filled"  placeholder="Enter 6 digit pin" onChangeText={(e)=>handleChange(e,"pin")} password={true} secureTextEntry={true}
          backgroundColor= 'darkBlue.50' color='coolGray.900' size= "lg" fontWeight='bold' fontSize='12'
          />  
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.pin}
          </FormControl.ErrorMessage>  
          <Divider my="1" bg='#ecfeff' />
          <Button onPress={handleSubmit} backgroundColor= 'darkBlue.600'  _text={{fontSize:"md"}}
           borderColor= "darkBlue.50" borderWidth="1">Next</Button>
          <FormControl.HelperText>
              {message}
            </FormControl.HelperText>
            <Divider my="1" bg='#ecfeff' />
          <Button  onPress={() => navigation.navigate("Login") } backgroundColor= 'darkBlue.600'  _text={{fontSize:"md"}}
          borderColor= "darkBlue.50" borderWidth="1">Go to back</Button>
          {/* SE AGREGO LA PROP NAVIGATION A LA FUNCION PARA PROBAR ESTO, REVISAR BIEN */}
        </Stack>
      
    
    </FormControl>
    </ScrollView>
  </Box>
  
  );
}

const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000e21',
    
    alignItems: 'center',
    justifyContent: 'center',
    
   
  },
});


