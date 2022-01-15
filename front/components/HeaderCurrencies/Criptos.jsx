import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
 
  Avatar
} from 'native-base';
import { Pressable } from 'react-native';

export default function Criptos({token,price}) {
  
return (

   <Pressable onPress={()=> console.log(navigation)/* ,{
        token:token

        } */}>
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
        <Stack direction="row" >
            <Box aligSelf="center" >
            <Avatar bg="#ffffff" size="lg"  alignSelf="center">
                <Text color="#000000" fontWeight="bold"fontSize="4xl">{token.charAt(0)}</Text>
            </Avatar>
            </Box>
            <VStack>
            <Text px="5" fontWeight="bold" fontSize="lg"color="#ffffff">{token}</Text>
            <Text px="5" ml="100px"fontSize="xl"color="#ffffff">${price}</Text>
            </VStack>
            

        </Stack>
            
        </Box>  
        </Pressable>
  
 
  );
}