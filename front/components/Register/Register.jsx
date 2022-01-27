
import { StyleSheet, Dimensions} from 'react-native';

import {  ScrollView, Stack, Input,  FormControl,WarningOutlineIcon,Heading,Button, Box, Divider, Icon, Text } from 'native-base';
import { AntDesign } from "@expo/vector-icons"
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

});
const [emailSent, setEmailSent] = useState(false);

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
             await axios.post(`session/signup`, state)
            setMessage("Sign in succeeded.");
            setEmailSent(true);
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
    <Box height={windowsHeight} backgroundColor="theme.100">
      <ScrollView>
      <Box mt= "40px" backgroundColor="theme.100">
      <FormControl
      mt= "20px"
      isInvalid
      width={{
        base: "100%",
        md: "25%",}}
      
      style={styles.container} >
        <Box>

        </Box>
            <Heading>Register </Heading>
            <Divider my="6" bg='#ecfeff' />
            
        <Stack
        space={4}
        width={{
          base: "85%",
          md: "25%",
        }}
        
        >  
          
          <Input variant="filled"  placeholder="Enter Name" onChangeText={(e)=>handleChange(e,"firstname")} 
          color='coolGray.900' 
          backgroundColor= '#e4e4e7' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor= "#fafafa" 
          borderWidth="2"/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.firstName}
          </FormControl.ErrorMessage>  
      
          <Input variant="filled"  placeholder="Enter Last Name" onChangeText={(e)=>handleChange(e,"lastname")} 
          color='coolGray.900' 
          backgroundColor= '#e4e4e7' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor= "#dark.900" 
          borderWidth="2"/> 
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.lastName}
          </FormControl.ErrorMessage>   
          
          <Input  variant="filled" placeholder="Enter Email" onChangeText={(e)=>handleChange(e,"email")} 
          color='coolGray.900' 
          backgroundColor= '#e4e4e7' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor= "#dark.900" 
          borderWidth="2" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.email}
          </FormControl.ErrorMessage>  
          
          <Input  variant="filled"  placeholder="Enter Phone" onChangeText={(e)=>handleChange(e,"phone")} 
          color='coolGray.900' 
          backgroundColor= '#e4e4e7' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor= "#dark.900" 
          borderWidth="2"/> 
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.phone}
          </FormControl.ErrorMessage>   
      
          <Input variant="filled"  placeholder="Enter Password" onChangeText={(e)=>handleChange(e,"password")} 
          password={true} secureTextEntry={true}
          backgroundColor= '#e4e4e7' 
          color='coolGray.900' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor="#dark.900" 
          borderWidth="2"
          />  
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.password}
          </FormControl.ErrorMessage>  

          <Input variant="filled"  placeholder="Enter 6 digit pin" onChangeText={(e)=>handleChange(e,"pin")} 
          password={true} secureTextEntry={true}
          backgroundColor= '#e4e4e7' 
          color='coolGray.900' 
          size= "lg" 
          fontWeight='bold' 
          fontSize='16'
          borderColor= "#dark.900" 
          borderWidth="2"
          />  
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
            {error.pin}
          </FormControl.ErrorMessage>

          <Divider my="1" bg='#ecfeff' />

          <Button onPress={handleSubmit} bg= "theme.50"  _text={{fontSize:"md"}}
           borderColor= "darkBlue.50"
           borderWidth="1" 
           color= 'theme.100' >Next</Button>

          <FormControl.HelperText>
              {message}
          </FormControl.HelperText>
          {emailSent ? <Button onPress={() => navigation.navigate("ValidateEmail")} bg= "theme.50"  _text={{fontSize:"md"}}
           borderColor= "darkBlue.50"
           borderWidth="1" 
           color= 'theme.100' >Validate your email</Button> : 
           <Text>Waiting</Text>}

          <Divider my="1" bg='#ecfeff' />

          <Button  onPress={() => navigation.navigate("Login") } 
          size="sm" h="9" 
          bg= "theme.50" 
          color= 'theme.100' 
          _text={{fontSize:"md"}}
          borderColor= "darkBlue.50" 
          borderWidth="1" 
          leftIcon={<Icon as={<AntDesign name="back" size={5} color="black"/>}/>}>Go to back</Button>
          
        </Stack>
    </FormControl>
    </Box>    
    </ScrollView>
  </Box>
  
  );
}

const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  /*   backgroundColor: 'theme.100', */
    
    alignItems: 'center',
    justifyContent: 'center',
    
   
  },
});


