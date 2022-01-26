import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST} from "@env"
import {

  Box,
  
  Stack,Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  VStack,
  ZStack,
  Modal,
  FormControl,
  HStack

  
} from 'native-base';

import { Pressable} from 'react-native';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';



export default function Sell({route, navigation}) {
      const {currency, amount} = route.params
      const [disabledButton, setDisableButton] = useState(true)
      const [showModal, setShowModal] = useState(false)
      const blockChain = useSelector(state => state.blockChain);
      const [urlBlockChain, setUrlBlockChain]= useState("");
      const [founds, setFounds] = useState("0.00");
    
      const [mes, setMes] = useState("")
      
      React.useEffect(()=>{

        if(blockChain === "stellar"){
          setUrlBlockChain("stellar")
        }
        else if(blockChain === "ethereum"){
  
          setUrlBlockChain("ethereum");
        }
  
  
      },[blockChain])



async function transferUser (){


    if(blockChain === "stellar"){
        
  try {
    setMes("loading...")
    const response = await axios({
      method: "post",
      data: {
        sellCurrency:currency,
        sellAmount: founds
  
      },
      withCredentials: true,
      url: `http://${IP_HOST}:3001/operation/${urlBlockChain}/sell`,
    });

    setMes(response.data)
    setTimeout(()=>navigation.navigate("CurrenciesIndex"),1000)

  } catch (error) {
    setMes("Failed Transfer")
    console.error(error);
  } 


      }
      else if(blockChain === "ethereum"){
        
  try {
    setMes("loading...")
    const response = await axios({
      method: "post",
      data: {
        currency: currency,
         amount: founds,                                              
       
  
      },
      withCredentials: true,
      url: `http://${IP_HOST}:3001/operation/${urlBlockChain}/sell`,
    });

    setMes(response.data)
    setTimeout(()=>navigation.navigate("CurrenciesIndex"),1000)

  } catch (error) {
    setMes("Failed Transfer")
    console.error(error);
  } 
        
      }






}







    return (
      <>    
      {/* Componente amount y button go back */}
           <Box
          mt="50px"
          py="1"
          mb="5"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="#FFC902"
          
         
          >

          <Stack direction="row" alignItems="center" rounded="md">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
          <VStack>
          <Text ml="70px" fontSize="xl" color="black" fontWeight="bold" >Amount available </Text> 
             
          </VStack>
             
          </Stack>
          <VStack alignSelf="center">
          
          <Text color="#ffffff" ml="24px" fontWeight="bold" mt="-5" fontSize="6xl"> {amount} </Text>
          <Text ml="220px" mt="-5" fontSize="xl"  color="darkBlue.800" fontWeight="bold" >{currency} </Text> 
          </VStack>
          
          </Box>
         {/* Currency and amount */}
         
          <Box alignSelf="center" alignItems="center" >
          

         
          <Box
          mt="20px"
          py="1"
          mb="5"
          alignItems="center"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="#CF2E2E"
          
          
         
          >

          <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
            Amount to sell of {currency}:
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="6xl"> {founds} </Text>
          
      </Box>

      <Box
          mt="20px"
          py="1"
          mb="5"
          alignItems="center"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="darkBlue.900"
           >

          <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
            Your new {currency} amount will be: :
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="6xl"> {(parseFloat(amount) - parseFloat(founds)).toFixed(4) } </Text>
      
      </Box>
      {(mes)?mes:""}
      <Text ml="70px" fontSize="xl" color="black" fontWeight="bold" > {(mes)?mes:""} </Text> 
      <HStack alignSelf="center">
      <Button rounded="lg" px="7" py="1" bg="darkBlue.900"onPress={() => setShowModal(true)}>
        <Text color="#ffffff" fontSize="4xl" fontWeight="bold">Mont</Text></Button>
        <Button ml="2"rounded="lg" px="7" bg="black" py="1" isDisabled={disabledButton} onPress={() => transferUser()}>
        <Text color="#ffffff" fontSize="4xl" fontWeight="bold">Confirm</Text></Button>
      </HStack>

      {(mes)?mes:""}

          </Box>
      
          
        
         

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>Amount to sell</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>How much {currency} do you want to sell?</FormControl.Label>
                
                <InputGroup
                  width={{
                    base: "70%",
                    md: "285",
                  }}
                >
                  <InputLeftAddon children={"$"} />
                  <Input
                    width={{
                      base: "70%",
                      md: "100%",
                    }}
                    placeholder="Amount"
                    onChangeText={setFounds}
                  />
                  

                </InputGroup>
                
               
              </FormControl>

            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false)
                    
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                   setShowModal(false)
                   setDisableButton(false)

                   
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

     
      </>
  
 
  );
}
