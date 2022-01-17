import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST} from "@env"
import axios from 'axios';
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
import { geTransactionUser } from '../../redux/actions';



export default function BuyCurrencie({route, navigation}) {
    const {token, price} = route.params;
    const [founds, setFounds] = useState("");
    const dispatch = useDispatch()
    const [mes, setMes] = useState("")
    const [state, setState] = useState({});
    async  function  buyToken(){
       try {
            setMes("loading...")
            const response = await axios({
              method: "post",
              data: {
                amount: founds,
                currency: "USDT",
                purchaseCurrency: token.slice(0, -4)
              },
              withCredentials: true,
              url: `http://${IP_HOST}:3001/operation/stellar/purchase`,
            });
            dispatch(geTransactionUser())
            setMes(response.data)
            setTimeout(()=>navigation.navigate("CurrenciesIndex"),1000)

          } catch (error) {
            setMes("Failed buy")
            console.error(error);
          } 

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
                    color="black"
                    width="250"
                     placeholder="Amount"
                     onChangeText={setFounds}
                   />
 
                 </InputGroup>


        <Button onPress={()=> buyToken()}>
            Buy
            </Button>
            <Text color="black" mt="2" fontWeight="bold" fontSize="lg" pb="1">
             {(mes)?mes:""}
            </Text>
          </Box>
          
          
     

     
      </>
  
 
  );
}