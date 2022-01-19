import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
  Button,
 
  Avatar,
  ZStack
} from 'native-base';

export default function Tokens({currency, amount, nav}) {
return (

   
        <Box 
         bg="black"
         
         py="5"
         px="1"
         mb="01"
        shadow={9}
         rounded="md"
        
         alignSelf="center"
         width={350}
         height={100}
         
         maxWidth="100%"
         maxHeight="100%"
        >
          <ZStack> 
        <Stack direction="row" >
            <Box aligSelf="center" >
            <Avatar bg="#ffffff" size="lg"  alignSelf="center">
                <Text color="#000000" fontWeight="bold"fontSize="4xl">{currency.charAt(0)}</Text>
            </Avatar>
            </Box>
            <VStack>
            <Text px="5" fontWeight="bold" fontSize="lg"color="#ffffff">{currency}</Text>
            
            </VStack>
            <VStack alignItems="center" >
            <Text px="1" mt="1" ml="70" color="tertiary.400">{parseFloat(amount).toFixed(5)}{currency}</Text>
           
            </VStack>
           
          
        </Stack>
        <Button mt="9"  ml="250px" bg="indigo.600" borderColor="#171717" fontWeight="bold" borderWidth="2" 
        onPress={()=>nav.navigate("UserTransfer",{amount:parseFloat(amount).toFixed(5), currency:currency}) }>Transfer</Button>
             </ZStack>
        </Box>  
      
  
 
  );
}