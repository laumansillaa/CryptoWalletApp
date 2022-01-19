import * as React from 'react';


import {

  Box,
  Stack,
  
  VStack,
  Text,
 
  Avatar,
  Button,
  ZStack
} from 'native-base';
import { Pressable } from 'react-native';

export default function Criptos({token, nav}) {
   

return (

   <Pressable onPress={()=> nav.navigate("OperationCurrencies", {
    currency:token
   })}>
        <Box 
         bg="darkBlue.900"
         mt="1"
         pl="3"
         mb="2"
        shadow={9}
         rounded="md"
        height={55}
         alignSelf="center"
         width={300}
         
         maxWidth="100%"
         maxHeight="100%"
        >
          <ZStack>
        <Stack direction="row" >
            <Box aligSelf="center" >
            <Avatar shadow={5} mt="4" bg="#ffffff" size="md" borderWidth="2" borderColor="darkBlue.900" alignSelf="center">
                <Text color="#000000" fontWeight="bold"fontSize="xl">{token.charAt(0)}</Text>
            </Avatar>
            </Box>
            <VStack>
            <Text px="5" mt="4" fontWeight="bold" fontSize="lg"color="#ffffff">{token}</Text>
            
            </VStack>
          

        </Stack>
        {/* <Button bg="indigo.600" fontWeight="bold" ml="241px" onPress={()=> nav.navigate("CardCripto", {
    token
   })}>Buy</Button> */}
        </ZStack>   
        </Box>  
        </Pressable>
  
 
  );
}