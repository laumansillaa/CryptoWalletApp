import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
 
  Avatar
} from 'native-base';

export default function Tokens() {
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
        <Stack direction="row" >
            <Box aligSelf="center" >
            <Avatar bg="#ffffff" size="lg"  alignSelf="center">
                <Text color="#000000" fontWeight="bold"fontSize="4xl">B</Text>
            </Avatar>
            </Box>
            <VStack>
            <Text px="5" fontWeight="bold" fontSize="lg"color="#ffffff">Bitcoin</Text>
            <Text px="5" fontSize="xl"color="#ffffff">$43.719</Text>
            </VStack>
            <VStack alignItems="center" >
            <Text px="1" mt="1" ml="70px" color="tertiary.400">0.0014 BTC</Text>
            <Text px="1" ml="70px" fontSize="xl" color="tertiary.400">$650</Text>
            </VStack>

        </Stack>
            
        </Box>  
      
  
 
  );
}