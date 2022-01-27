import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST} from "@env"
import axios from 'axios';
import {

  Box,
  useToast,
  Stack,Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  InputRightAddon

  
} from 'native-base';

import { Pressable} from 'react-native';
import { Dimensions } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { geTransactionUser } from '../../redux/actions';
import { validateFunds } from '../Utils/Utils';



export default function BuyCurrencie({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
    const {token, price} = route.params;
    const [loading, setLoading] = useState("")
    const [disabled, setDisabled] = useState(true)
    const toast = useToast()
    const [founds, setFounds] = useState("0");
    const dispatch = useDispatch()
    const [mes, setMes] = useState("")
    const blockChain = useSelector(state => state.blockChain);
    const balanceFunds = useSelector(state => state.userData.balance.funds.balance)
    const [urlBlockChain, setUrlBlockChain]= useState("");

    React.useEffect(()=>{

      if(blockChain === "stellar"){
        setUrlBlockChain("stellar")
      }
      else if(blockChain === "ethereum"){

        setUrlBlockChain("ethereum");
      }


    },[blockChain])

    
    React.useEffect(()=>{

      
      setMes("")
      if( validateFunds(founds)){

        if(parseFloat(founds) > 0){
          if(parseFloat(founds)<= parseFloat(balanceFunds)){

            setMes("")
            setDisabled(false)
             
           }else{
            setDisabled(true)
            setMes("Insufficient funds")
            }

        }else{

          setMes("")
        }
         
    }else{
        setDisabled(true)
        setMes("Please write a valid amount ")
      }
     
   

    },[founds])


    async  function  buyToken(){
       try {
        setLoading(true)
        toast.show({
          title: "Buying...",
          placement: "top"
      
        })
           
            const response = await axios({
              method: "post",
              data: {
                amount: founds,
                currency: "USDT",
                purchaseCurrency: token
              },
              withCredentials: true,
              url: `http://${IP_HOST}:3001/operation/${urlBlockChain}/purchase`,
            });
            dispatch(geTransactionUser())
            toast.show({
              title: response.data,
              placement: "bottom"
        
            })
            setLoading(false)
            setTimeout(()=>navigation.popToTop(),1000)

          } catch (error) {
          
            setDisabled(true)
            setLoading(false)
            setMes("Failed buy")
            
          } 

    }


    function handleChange(e){

      setFounds(e)
     


    }



  
    return (
      <>    
      <Box bg="theme.100"
      height={windowHeight}
      >
           <Box
        mt="10"
          py="1"
          rounded="md"
          alignSelf="center"
          width={375}
          
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="theme.50" size="9"/>
          </Pressable>
             <Text ml="50px" fontSize="xl" color="theme.50" fontWeight="bold" > Buy Currency </Text> 
             <Text ml="20px" fontSize="xl" color="theme.300" fontWeight="bold" > {token} </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="theme.50" fontWeight="bold" fontSize="6xl"> ${price} </Text>
  {/*         <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${stateToken?.price} </Text> */}

          <Box
             bg="theme.400"
             
             
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={300}
             height={50}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="theme.50" mt="2" fontWeight="bold" fontSize="lg" pb="1">
             {token}
            </Text>
            
      </Box>
      <InputGroup
                 mt="5"
                 color="theme.50"
                 colorScheme="theme"
                 mb="5"
                 _focus={{
                  borderColor:"theme.300" ,
                }}
               
                 
                 >
                   <InputLeftAddon color="theme.300" children={"$"} />
                   <Input
                    borderColor="theme.300"
                    color="black"
                    width="250"
                    _hover={{
                      bg:"theme.300" ,
                    }}
                    colorScheme="theme"
                     placeholder="Amount"
                     onChangeText={handleChange}
                   />
                <InputRightAddon children={"USD"} />
                 </InputGroup>


        <Button 
        px="10"
          
          variant="outline" colorScheme="theme"
          isDisabled={disabled}
          isLoading={loading}
        onPress={()=> buyToken()}>
          <Text fontSize="lg">
          Buy
          </Text>
           
            </Button>
           <Text color="theme.300">{mes}</Text>
          </Box>
          
          
          </Box>

     
      </>
  
 
  );
}