import * as React from 'react';


import {

  Box,
  Button
  
} from 'native-base';

export default function UserCriptos({navigation}) {
return (

   
        <Box 
         bg="#ffffff"
         py="5"
         px="3"
         mb="01"
        shadow={9}
         rounded="md"
        
         alignSelf="center"
        width={500}
         
         maxWidth="100%"
         maxHeight="100%"
        >
        <Button onPress={()=> navigation.goBack()}>Back</Button>
            
        </Box>  
      
  
 
  );
}