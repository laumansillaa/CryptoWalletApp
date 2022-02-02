import { BACKEND_URL } from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useFocusEffect } from '@react-navigation/native';
import { Dimensions, Pressable } from 'react-native';
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
import axios from 'axios';
import { validateFunds } from '../../Utils/Utils';

export default function Transfer({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
  const windowWidth = Dimensions.get("window").width
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
    setUrlBlockChain(blockChain)
  },[blockChain])

  React.useEffect(()=>{
    if(parseFloat(amount) > 0){
     setDisableMont(false)
    }else{
     setDisableMont(true)
    }
  }, [])

  React.useEffect(()=>{
    setMes("")
    if( validateFunds(founds)) {
      if(parseFloat(founds) > 0) {
        if(parseFloat(founds)<= parseFloat(amount)) {
          setMes("")
          setDisableButton(false)
        } else {
          setDisableButton(true)
          setMes(`Insufficient ${currency}`)
        }
      } else {
        setMes("")
      }
    } else {
      setDisableButton(true)
      setMes("Please write a valid amount ")
    }
  },[founds])

  async function transferUser () {
    try {
      toast.show({
        title: "Transfer...",
        placement: "top"
       });

      setLoading(true)

      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${BACKEND_URL}/operation/${urlBlockChain}/transfer`,
        data: {
          transferCurrency: currency,
          transferAmount:founds,
          pKey: publicKey
        },
      });

      setLoading(false)

      setMes(response.data)

      toast.show({
        title: response.data,
        placement: "bottom"

      });

      setTimeout(() => navigation.popToTop(),1000)
    } catch (error) {
      toast.show({
        title: "Error",
        placement: "bottom"
      });
    } 
  }

  return (
    <>
      <Box bg="theme.100" height={windowHeight}>
        {/* Componente amount y button go back */}
        <HStack justifyContent="space-between" pt="20px" px="13px">
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="theme.300" size="40px"/>
        </Pressable>

        {/* <VStack> */}
        {/*   <Box> */}
        {/*     <Text>Your <Text color="theme.300">{currency}</Text> available amount: {amount}</Text> */}
        {/*   </Box> */}
        {/*   <Box> */}
        {/*     <Text>Transfer amount: {founds}</Text> */}
        {/*   </Box> */}
        {/*   <Box> */}
        {/*     <Text>Transfer beneficiary: {publicKey}</Text> */}
        {/*   </Box> */}
        {/*   <Box> */}
        {/*     <Text>Your {currency} available amount: {amount}</Text> */}
        {/*   </Box> */}
          
        {/* </VStack> */}

        <Text
          alignSelf="center"
          py="1px"
          px="11px"
          bg="theme.125"
          borderRadius="4px"
          color="theme.50"
          fontSize="22px"
          fontWeight="bold"
          letterSpacing="1px"
        ><Text color="theme.300">{currency}</Text> TRANSFER</Text> 
        </HStack>

        <Box
          alignSelf="center"
          mt="53px"
          mb="2"
          p="10px"
          width={windowWidth * 0.93}
          borderRadius="4px"
          bg="theme.300"
        >
          <Text fontSize="16px" color="theme.100" fontWeight="bold">Available amount: {amount}</Text> 
        </Box>

        {/* Currency and amount */}
          <Box
            py="1"
            alignItems="center"
            rounded="xl"
            alignSelf="center"
            width={375}
            maxWidth="100%"
            bg="theme.125"
          >
            <Text color="#fff" fontWeight="bold" fontSize="lg" pb="1">Transfer amount: {founds}</Text>

            <Text color="#ffffff"  fontWeight="bold" fontSize="lg" pb="1">Transfer beneficiary: {publicKey}</Text>
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
            <Text color="#ffffff" fontWeight="bold" fontSize="4xl"> 
              {(parseFloat(amount) - parseFloat(founds)).toFixed(4) }
            </Text>
          </Box>
  
          <HStack alignSelf="center">
            <Button variant="outline" colorScheme="theme"  isDisabled={disabledMont} rounded="lg" px="7" py="1"  onPress={() => setShowModal(true)}>
              <Text color="#ffffff" fontSize="2xl" >Mont</Text>
            </Button>

            <Button variant="outline" colorScheme="theme" isLoading={loading} ml="2"rounded="lg" px="7"  py="1" isDisabled={disabledButton} onPress={() => transferUser()}>
              <Text color="#ffffff" fontSize="2xl" >Confirm</Text>
            </Button>
          </HStack>

          <Text color="theme.300">{mes}</Text>
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
