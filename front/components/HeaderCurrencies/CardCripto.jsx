import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
 
  Avatar
} from 'native-base';

export default function CardCripto({route}) {
        const {token} = route.params;

    return (
        
   
        <Box 
         bg="indigo.600"
         
         py="5"
         px="3"
         mb="01"
        shadow={9}
         rounded="md"
        
         alignSelf="center"
         width={350}
         
         maxWidth="100%"
         maxHeight="100%"
        >
            <Text color="#000000">{token}</Text>
            
        </Box>  
      
  
 
  );
}