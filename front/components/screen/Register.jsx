import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';

import { extendTheme, NativeBaseProvider, Box, Divider,Stack, Input, Icon, FormControl,WarningOutlineIcon,Heading,Button } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import { useState, useEffect } from 'react';
import { validateEmail } from '../../utils/Utils';
export default function Register() {


const [state,setState] = useState({
  name: "",
  lastName: "",
  email:"",
  phone:"",
  password:""

})
const [error, setError] = useState({
  errorName: "",
  errorLastName: "",
  errorEmail:"",
  errorPhone:"",
  errorPassword:""

})

function validateData (){
  setError({...error, errorName: "",
  errorLastName: "",
  errorEmail:"",
  errorPhone:"",
  errorPassword:""})

  let isValid = true
  if(state.email?!validateEmail(state.email):false){
    setError({...error, errorEmail: "Debe ingresar un email valido"})
    isValid = false;
  }
  if(state.password?!(state.password.length === 6) :false){
    setError({...error, errorPassword: "Debe ingresar una password valido"})
    isValid = false;
  }
  

  

  return isValid;
}


useEffect(()=>{

  validateData()
  
  
},[state])



const handleChange = (e, atr)=>{

setState({...state, [atr]: e})


}

function handleSubmit(){
validateData()

}




  return (
  
    <FormControl
    isInvalid
    w={{
      base: "100%",
      md: "25%",}}
    style={styles.container}
    
  >


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
        
        <Input variant="filled"  placeholder="Enter Name" onChangeText={(e)=>handleChange(e,"name")} />  
     
        <Input variant="filled"  placeholder="Enter Last Name" onChangeText={(e)=>handleChange(e,"lastName")}/>  
        
        <Input  variant="filled" placeholder="Enter Email" onChangeText={(e)=>handleChange(e,"email")} errorMessage={error.errorEmail} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.errorEmail?error.errorEmail:""}
        </FormControl.ErrorMessage>  
        
        <Input  variant="filled"  placeholder="Enter Phone" onChangeText={(e)=>handleChange(e,"phone")} />  
    
        <Input variant="filled"  placeholder="Enter Password" onChangeText={(e)=>handleChange(e,"password")} password={true} secureTextEntry={true}
         />  
           <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error.errorPassword?error.errorPassword:""}
        </FormControl.ErrorMessage>  

        <Button onPress={handleSubmit}>Next</Button>

      </Stack>
     
  
  </FormControl>
   
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
