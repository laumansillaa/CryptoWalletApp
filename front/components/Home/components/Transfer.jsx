import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"
import { Dimensions } from 'react-native';
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
  HStack,
  Center,
  Container,
  useToast,
  Spinner

  
} from 'native-base';

import { Pressable} from 'react-native';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { validateFunds } from '../../Utils/Utils';


export default function Transfer({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
      const {currency, amount} = route.params
      const [loading, setLoading] = useState("")
      const toast = useToast()
      const [disabledMont, setDisableMont] = useState(true)
      const [disabledButton, setDisableButton] = useState(true)
      const [showModal, setShowModal] = useState(false)
      const blockChain = useSelector(state => state.blockChain);
      const [urlBlockChain, setUrlBlockChain]= useState("");
      const [founds, setFounds] = useState("0.00");
      const [publicKey, setPublicKey] = useState("")
      const [mes, setMes] = useState("")
      React.useEffect(()=>{

        if(blockChain === "stellar"){
          setUrlBlockChain("stellar")
        }
        else if(blockChain === "ethereum"){
          
  
          setUrlBlockChain("ethereum");
        }
  
  
      },[blockChain])


      React.useEffect(()=>{

        if(parseFloat(amount) > 0){
 
         setDisableMont(false)
 
        }else{
         setDisableMont(true)
        }
   
   
       },[])


       React.useEffect(()=>{

      
        setMes("")
        if( validateFunds(founds)){
      
          if(parseFloat(founds) > 0){
            if(parseFloat(founds)<= parseFloat(amount) ){
      
              setMes("")
              setDisableButton(false)
               
            }else{
         
              setDisableButton(true)
              setMes(`Insufficient ${currency}`)
            }
      
          }else{
            setMes("")
      
          }
         
       }else{
          setDisableButton(true)
          setMes("Please write a valid amount ")
        }
       
      
      
      },[founds])




async function transferUser (){


  
  try {
    toast.show({
      title: "Transfer...",
      placement: "top"

    })

    setLoading(true)
   const response = await axios({
      method: "post",
      data: {
        transferCurrency: currency,
        transferAmount:founds,
        pKey: publicKey
      },
      withCredentials: true,
      url: `${DEPLOYED_BACKEND_URL}operation/${urlBlockChain}/transfer`,
    });
    setLoading(false)
    setMes(response.data)
    toast.show({
      title: response.data,
      placement: "bottom"

    })
    setTimeout(()=>navigation.popToTop(),1000)

  } catch (error) {
    toast.show({
      title: "Error",
      placement: "bottom"

    })
    

  } 


}







    return (
      <>    

      {/* Componente amount y button go back */}
      <Box bg="theme.100"
      height={windowHeight}
      >

     
           <Box
         mt="20"
          py="1"
         mb="2"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="theme.200"
          
         
          >

          <Stack direction="row" alignItems="center" rounded="md">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="theme.150" size="9"/>
          </Pressable>
          <VStack>
          <Text ml="70px" fontSize="xl" color="theme.100" fontWeight="bold"  >Amount available </Text> 
             
          </VStack>
             
          </Stack>
          <VStack alignSelf="center">
          
          <Text color="#ffffff" ml="60px" mt="-3" fontWeight="bold"  fontSize="4xl"> {amount} </Text>
          <Text ml="200px" mt="-5" fontSize="xl"  color="theme.150" fontWeight="bold" >{currency} </Text> 
          </VStack>
          
          </Box>
         {/* Currency and amount */}
         
          <Box alignSelf="center" alignItems="center" >
          
          <Box
       
          py="1"
         
          alignItems="center"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="theme.150"
          
          
         
          >

          <Text color="#ffffff" fontWeight="bold" fontSize="lg" pb="1">
            Amount to transfer from {currency}:
            </Text>
          <Text color="#ffffff" mt="-3"fontWeight="bold" fontSize="4xl"> {founds} </Text>
          <Text color="#ffffff"  fontWeight="bold" fontSize="lg" pb="1">
              To the wallet:
            </Text>
            <Box >
            <Text color="theme.300" mt="-1" fontWeight="bold" fontSize="sm" pb="1">
             {publicKey}
            </Text>
            </Box>
            
      </Box>

      <Box
          mt="10px"
          py="1"
          mb="5"
          alignItems="center"
          rounded="xl"
          alignSelf="center"
          width={375}
          maxWidth="100%"
          bg="theme.300"
           >

          <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
            Your new {currency} amount will be: :
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="4xl"> {(parseFloat(amount) - parseFloat(founds)).toFixed(4) } </Text>
      
      </Box>
  
      <HStack alignSelf="center">
      <Button variant="outline" colorScheme="theme"  isDisabled={disabledMont} rounded="lg" px="7" py="1"  onPress={() => setShowModal(true)}>
        <Text color="#ffffff" fontSize="2xl" >Mont</Text></Button>
        <Button variant="outline" colorScheme="theme" isLoading={loading} ml="2"rounded="lg" px="7"  py="1" isDisabled={disabledButton} onPress={() => transferUser()}>
        <Text color="#ffffff" fontSize="2xl" >Confirm</Text></Button>
      </HStack>
      <Text color="theme.300">{mes}</Text>

          </Box>

          </Box>
        
         

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>Amount to transfer</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>How much {currency} do you want to transfer?</FormControl.Label>
                <VStack alignItems="center">
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
                <Input
                  mt="5"
                    width={{
                      base: "70%",
                      md: "100%",
                    }}
                    placeholder="Public Key.."
                    onChangeText={setPublicKey}
                  />
                  </VStack>
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
