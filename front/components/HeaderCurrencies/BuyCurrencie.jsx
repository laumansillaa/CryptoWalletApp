import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {

  Box,
  
  Stack,Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button

  
} from 'native-base';

import { Pressable} from 'react-native';


import { useDispatch, useSelector } from 'react-redux';



export default function BuyCurrencie({route, navigation}) {
    const {token, price} = route.params;
    const [founds, setFounds] = useState("");
    const [state, setState] = useState({});
    function buyToken(){
/*         try {
            
            const response = await axios({
              method: "post",
              data: {
                email: email,
                password: password,
              },
              withCredentials: true,
              url: `http://${IP_HOST}:3001/session/localSignin`,
            });
            userToken = "loggety logged";     
            await AsyncStorage.setItem('userToken', userToken);
            dispatch(Log(userToken));  
            setMessage("Log in succeeded.");
          } catch (error) {
            setMessage("Registration failed, try again ");
            console.error(error);
          } */

    }
  
    return (
      <>    
     
           <Box
          mt="50px"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
             <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" > Buy Currencie </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${price} </Text>
  {/*         <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${stateToken?.price} </Text> */}

          <Box
             bg="darkBlue.900"
             
             
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={300}
             height={50}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
             {token}
            </Text>
            
      </Box>
      <InputGroup
                 mt="5"
                 mb="5"
                 >
                   <InputLeftAddon color="black" children={"$"} />
                   <Input

                    width="250"
                     placeholder="Amount"
                     onChangeText={setFounds}
                   />
 
                 </InputGroup>


        <Button onPress={()=> navigation.goBack()}>
            Buy
            </Button>
          </Box>
          
         
     

     
      </>
  
 
  );
}