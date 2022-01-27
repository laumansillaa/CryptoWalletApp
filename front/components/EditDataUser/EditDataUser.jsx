
import { Dimensions, StyleSheet, } from 'react-native';

import {  ScrollView, 
NativeBaseProvider, 
Stack, 
Input,  
FormControl,
WarningOutlineIcon,
Heading,
Button, 
Box,
Pressable,
ChevronLeftIcon,
Text, 
Container,
Center
} from 'native-base';
import { useState, useEffect } from 'react';
import { validateEmail, validateNumber, validatePassword, validateString, validatePin } from '../Utils/Utils';
import axios from "axios"
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"

import { useSelector, useDispatch } from 'react-redux';
import {  getDataUser } from '../../redux/actions';

export default function EditDataUser({navigation}) {
const userData = useSelector(state => state.userData)
 const dispatch = useDispatch()
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
    
    case "pin":
      validatePin(state.pin)? setError({...error, pin: ""}):setError({...error, pin:"Please enter a 6-digit pin, only numbers are accepted"});
    break;
  }

}


useEffect(()=>{validateData("firstname")},[state.firstname])
useEffect(()=>{validateData("lastname")},[state.lastname])
useEffect(()=>{validateData("phone")},[state.phone])

useEffect(()=>{validateData("email")},[state.email])
useEffect(()=>{validateData("pin")},[state.pin])
 


useEffect(()=>{
    setState(userData)

},[])

const handleChange = (e, atr)=>{

setState({...state, [atr]: e})}


 async function handleSubmit(){
  setMessage("Loading...")
  if(!error.firstName&&!error.lastName&&!error.email&&!error.phone&&!error.password&&!error.pin){

    if(state.firstname&&state.lastname&&state.email&&state.phone&&state.password&&state.pin){
      try {
        const response = await axios({
          method: "put",
          data: {
            id:3,
            firstname: state.firstname,
            lastname: state.lastname,
            phone: state.phone,
            email: state.email,
            password: state.password,
            pin: state.pin

          },
          withCredentials: true,
          url: `${DEPLOYED_BACKEND_URL}user/updateData`,
        })
        dispatch(getDataUser());
        setMessage("Updated information")
        
        navigation.navigate("AccountComponent");
     
      } catch (error) { console.error(error) }
      
      
      }else{
        setMessage("Please fill all fields");
      }
   
   }else{
    setMessage("Please review the warnings")
   }
  
  
}
 
  return (
    <Center height={windowsHeight}  backgroundColor="theme.100">
    <Box
    mt="50px"
    py="1"

    rounded="md"
    alignSelf="center"
    width={375}
    maxWidth="100%"

  >
    <Stack direction="row" alignItems="center">
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="theme.500" size="10" />
      </Pressable>
      <Text ml="100px" fontSize="xl" color="theme.500" fontWeight="bold" >Edit info</Text>
    </Stack>
  </Box>
    <ScrollView >
      <Box 
      mt= "40px" 
      display="flex"
      width={{
        base:"100%"
      }}
      flexDirection="column"
      alignItems='center'
      justifyContent='center'
      // borderColor="theme.300" 
      // borderWidth="1"  
      //   // justifyContent="space-between"
      //   // overflow="hidden"
      // borderColor="theme.300"
      // borderWidth="1"
      // _dark={{
      //     borderColor: "theme.200",
      //     backgroundColor: "theme.150",
      //   }}
      // _web={{
      //     shadow: 2,
      //     borderWidth: 0,
      //   }}
      // _light={{
      //     backgroundColor: "theme.100",
      //   }}
        >
    <FormControl
    isInvalid
    width={{
      base: "100%",
      md: "25%",
    }}
      flex={1}
      alignItems='center'
      justifyContent='center'
    >         
      <Stack
      space={4}
      width={{
        base: "85%",
        md: "25%",
      }}
      >  
        
        <Input variant="filled" value={state.firstname}  placeholder="Enter Name" 
        onChangeText={(e)=>handleChange(e,"firstname")}  
          color='coolGray.900' 
          backgroundColor= 'theme.200' 
          size= "xs" 
          fontWeight='normal' 
          fontSize='16'
          borderColor= "theme.500"
          borderWidth="1"/>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
          {error.firstName}
        </FormControl.ErrorMessage>  
     
        <Input variant="filled" value={state.lastname} 
        placeholder="Enter Last Name" onChangeText={(e)=>handleChange(e,"lastname")}
        color='coolGray.900' 
          backgroundColor= 'theme.200' 
          size= "xs" 
          fontWeight='normal' 
          fontSize='16'
          borderColor= "theme.400" 
          borderWidth="1"/> 
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
          {error.lastName}
        </FormControl.ErrorMessage>   
        
      
        
        <Input  variant="filled" value={state.phone} 
        placeholder="Enter Phone" onChangeText={(e)=>handleChange(e,"phone")}
        color='coolGray.900' 
          backgroundColor= 'theme.200' 
          size= "xs" 
          fontWeight='normal' 
          fontSize='16'
          borderColor= "theme.400" 
          borderWidth="1" /> 
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
          {error.phone}
        </FormControl.ErrorMessage>   
    
        <Button onPress={handleSubmit}   
        _text={{fontSize:"md"}}
           borderColor= "theme.400"
           borderWidth="1" 
           bg= 'theme.500'>Confirmar</Button>
        
        <FormControl.HelperText>
            {message}
          </FormControl.HelperText>
      </Stack>
     
  
  </FormControl>
  </Box>
  </ScrollView>
  </Center>
  );
}


const windowsHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08b6ff',
    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
