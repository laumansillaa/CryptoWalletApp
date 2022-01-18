import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
 
  Avatar
} from 'native-base';

export default function Transaction({action,date,mont,money}) {
return (

   
        <Box 
         bg="#ffffff"
         py="5"
         
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
            <Avatar bg="darkBlue.900" size="lg"  alignSelf="center">
                <Text fontSize="4xl">{money.charAt(0)}</Text>
            </Avatar>
            </Box>
            <VStack ml="10px">
            <Text   fontSize="lg"color="#000000">{action} de {money}</Text>
            <Text  fontSize="xs"color="#000000">{date}</Text>
            </VStack>
            <VStack ml="50px" >
            <Text ml="50px" mt="0.5"color="tertiary.400">{money}</Text>
            <Text fontSize="xl" color="tertiary.400">+{parseFloat(mont).toFixed(5)}</Text>
            </VStack>

        </Stack>
            
        </Box>  
      
  
 
  );
}