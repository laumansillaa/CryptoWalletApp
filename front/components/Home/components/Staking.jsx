import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"
import { Dimensions } from 'react-native';
import {
  Box,
  Stack,
  Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  VStack,
  ZStack,
  Modal,
  useToast,
  FormControl,
  HStack} from 'native-base';

import { Pressable} from 'react-native';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { validateFunds } from '../../Utils/Utils';


export default function Staking({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
  const toast = useToast()
      const {currency, amount,staking} = route.params
      const [disabledButton, setDisableButton] = useState(true)
  
      const [disableTakeOut, setDisableTakeOut] = useState(true)
      const [loading, setLoading] = useState("")
      const [loadingTakeStake, setLoadingTakeStake] = useState("")
      const [showModal, setShowModal] = useState(false)
      const blockChain = useSelector(state => state.blockChain);
      const [urlBlockChain, setUrlBlockChain]= useState("");
      const [disabledMont, setDisableMont] = useState(true)
      const balance = useSelector(state => state.userData.balance)
      const [founds, setFounds] = useState("0.00");
        const [foundsStalking, setFoundsStalking] = useState("0.00")
      const [mes, setMes] = useState("")
      
      React.useEffect(()=>{

         let aux 
        if(blockChain === "stellar"){
          setUrlBlockChain("stellar")
        aux = balance.stellar.currencies.find(element => element.currency === currency) 
        }
        else if(blockChain === "ethereum"){
          aux = balance.ethereum.currencies.find(element => element.currency === currency) 
          setUrlBlockChain("ethereum");
        }


        if(aux){
             if(parseFloat(aux.staking) > 0){
                  setDisableTakeOut(false)
                  setDisableMont(true)
                  setFoundsStalking(aux.staking)

             }else{

              if(parseFloat(amount) > 0){
 
                setDisableMont(false)
        
               }else{
                setDisableMont(true)
               }

                
            }
       
    
        }
    
        

        
  
   

      },[blockChain, balance])

 
async function stakingUser (){

  toast.show({
    title: "Stalking...",
    placement: "top"

  })

        
  try {
    setLoading(true)
    const response = await axios({
      method: "post",
      data: {
        stakingCurrency: currency, 
        stakingAmount: founds
       
  
      },
      withCredentials: true,
      url: `${DEPLOYED_BACKEND_URL}operation/${urlBlockChain}/stake`,
    });

    setMes(response.data)
    setLoading(false)
    toast.show({
      title: response.data,
      placement: "bottom"

    })
    setTimeout(()=>navigation.popToTop(),1000)
    toast.show({
      title: response.data,
      placement: "bottom"

    })

  } catch (error) {
    setLoading(false)
    setMes("Failed Staking")
    console.error(error);
  } 


      
        

}

async function stakeTaking(){

  try {
    toast.show({
      title: "Withdrawing...",
      placement: "top"
  
    })
    setLoadingTakeStake(true)
    const response = await axios({
      method: "post",
      data: {
        stakingCurrency: currency, 
     
      },
      withCredentials: true,
      url: `${DEPLOYED_BACKEND_URL}operation/${urlBlockChain}/takestake`,
    });

    setMes(response.data)
    toast.show({
      title: "Success...",
      placement: "top"
  
    })

    setLoadingTakeStake(false)
    setTimeout(()=>navigation.popToTop(),1000)

  } catch (error) {
    setMes("Failed Staking")
    setLoadingTakeStake(false)
    console.error(error);
  } 


}

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
          rounded="md"
          alignSelf="center"
          width={360}
          maxWidth="100%"
          bg="theme.200"
          
         
          >

          <Stack direction="row" alignItems="center" rounded="md">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="theme.150" size="9"/>
          </Pressable>
          <VStack>
          <Text ml="80px" fontSize="lg" color="theme.150" fontWeight="bold" >Amount available </Text> 
             
          </VStack>
             
          </Stack>
          <VStack alignSelf="center">
          
          <Text color="#ffffff" ml="70px" fontWeight="bold" fontSize="2xl"> {amount} </Text>
          <Text ml="170px" mt="-5" fontSize="xl"  color="theme.200" fontWeight="bold" >{currency} </Text> 
          </VStack>
          
          </Box>
         {/* Currency and amount */}
         
          <Box alignSelf="center" mb="10" alignItems="center" >
          

         
          <Box
        
          py="1"
          mt="2"
          mb="2"
          alignItems="center"
          rounded="md"
          alignSelf="center"
          width={360}
          maxWidth="100%"
          bg="theme.150"
          
          
         
          >

          <Text color="theme.50" mt="2" fontWeight="bold" fontSize="lg" pb="1">
            Amount to staking of {currency}:
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="2xl"> {founds} </Text>
          
      </Box>

      <Box
          mt="1"
          py="1"
          mb="2"
          alignItems="center"
          rounded="md"
          alignSelf="center"
          width={360}
          maxWidth="100%"
          bg="theme.300"
           >

          <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
            Your new {currency} amount will be: :
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="2xl"> {(parseFloat(amount) - parseFloat(founds)).toFixed(4) } </Text>
      
      </Box>
      
      <Box
          mt="1"
          py="1"
          mb="5"
          alignItems="center"
          rounded="md"
          alignSelf="center"
          width={360}
          maxWidth="100%"
          bg="theme.400"
           >

          <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
          Your amount currently stalked : 
            </Text>
          <Text color="#ffffff" fontWeight="bold" fontSize="2xl"> {parseFloat(foundsStalking).toFixed(3) } </Text>
      
      </Box>
       <HStack alignSelf="center">

      <Button variant="outline" colorScheme="theme" rounded="md" px="7" isDisabled={disabledMont} py="1"   onPress={() => setShowModal(true)}>
        <Text color="#ffffff" fontSize="2xl" >Mont</Text></Button>

        <Button variant="outline" isLoading={loading} colorScheme="theme"  ml="2"rounded="md" px="7"  py="1" isDisabled={disabledButton} onPress={() => stakingUser()}>
        <Text color="#ffffff" fontSize="2xl" >Confirm</Text></Button>
        </HStack>
        <Button variant="outline"  isLoading={loadingTakeStake} colorScheme="theme" mt="2"rounded="md" px="7"  py="1" isDisabled={disableTakeOut} onPress={() => stakeTaking()}>
        <Text color="#ffffff" fontSize="2xl" >Withdraw currency</Text></Button>
   
        <Text color="theme.300">{mes}</Text>
  

          </Box>
      
          
          </Box>
         

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>Amount to sell</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>How much {currency} do you want to stalking?</FormControl.Label>
                
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
