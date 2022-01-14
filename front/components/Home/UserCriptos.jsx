import * as React from 'react';


import {

  Box,
  Button,
  IconButton,
  Stack,Text,
  ChevronLeftIcon,
  Center,
  ScrollView,
  
} from 'native-base';
import { useSelector } from 'react-redux';
import Tokens from './components/Tokens';



export default function UserCriptos({navigation}) {

 const balance = useSelector(state => state.userData.balance)
return (
<>
   
        <Box 
         bg="#ffffff"
         
         px="3"
         mb="01"
        shadow={9}
         rounded="md"
        
         alignSelf="center"
        width={500}
         height="2xl"
         maxWidth="100%"
         maxHeight="100%"
        >
           <Box
         
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Button  bg="#ffffff" onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Button>
             <Text ml="50px" fontSize="xl" color="darkBlue.900" fontWeight="bold" > YOUR BALANCE </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> $ {balance}</Text>
          <Box
             bg="darkBlue.900"
             py="5"
             px="1"
             mb={0.2}
             mt={0.5}
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={375}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="white" fontWeight="bold" fontSize="lg" pb="1">
            Tokens
            </Text>
      </Box>
          </Box>
          
         <ScrollView>
            <Tokens/>
          </ScrollView>
        </Box> 

        
      
      </>
 
  );
}