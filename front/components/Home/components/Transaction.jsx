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
            <Avatar bg="darkBlue.900" size="lg"  alignSelf="center">
                <Text fontSize="4xl">{money.charAt(0)}</Text>
            </Avatar>
            </Box>
            <VStack>
            <Text px="5"  fontSize="lg"color="#000000">{action} de {money}</Text>
            <Text px="5" fontSize="xs"color="#000000">{date}</Text>
            </VStack>
            <VStack alignItems="center" >
            <Text px="12" mt="0.5"color="tertiary.400">${money}</Text>
            <Text px="10" fontSize="xl" color="tertiary.400">+{mont}</Text>
            </VStack>

        </Stack>
            
        </Box>  
      
  
 
  );
}