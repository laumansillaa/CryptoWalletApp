import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';
import { extendTheme, NativeBaseProvider, Box, Divider,Stack, Input, Icon, FormControl,WarningOutlineIcon,Heading,Button } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import { useState, useEffect } from 'react';
export default function Register() {


const [state,setState] = useState({
  name: "",
  lastName: "",
  email:"",
  phone:"",
  password:""

})

function handleChange (e, atr){
  console.log(e)
setState({...state, [atr]: e.target.value})

}


useEffect(()=>{
  console.log(state)

},[state])



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
      
        <Input variant="filled"  placeholder="Enter Name" onChange={(e)=>handleChange(e,"name")}/>  
     
        <Input variant="filled"  placeholder="Enter Last Name" onChange={(e)=>handleChange(e,"lastName")}/>  
        
        <Input  variant="filled" placeholder="Enter Email" onChange={(e)=>handleChange(e,"email")} />  
        
        <Input  variant="filled"  placeholder="Enter Phone" onChange={(e)=>handleChange(e,"phone")} />  
    
        <Input variant="filled"  placeholder="Enter Password" onChange={(e)=>handleChange(e,"password")}/>  

        <Button >Send</Button>
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
