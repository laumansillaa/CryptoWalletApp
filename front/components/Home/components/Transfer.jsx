import { BACKEND_URL } from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useFocusEffect } from '@react-navigation/native';
import { Dimensions, Pressable } from 'react-native';
import {
  Box,
  Stack,Text,
  Divider,
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
    <Box height={windowHeight * 0.862} bg="theme.100">
      <HStack justifyContent="space-between" mt="20px" px="13px">
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="theme.300" size="40px"/>
        </Pressable>

        <Text px="11px"
          borderRadius="4px"
          bg="theme.175"
          color="theme.100"
          fontSize="22px"
          fontWeight="bold"
          letterSpacing="1px"
        ><Text color="theme.300">{currency}</Text> TRANSFER</Text> 
      </HStack>

      <Box alignSelf="center" mt="70px">
        <HStack justifyContent="space-between" alignItems="flex-end">
          <Text color="theme.50" fontSize="13px" letterSpacing="1px">AVAILABLE AMOUNT:</Text> 
          <Text top="3px" color="theme.50" fontSize="18px" fontWeight="bold">{amount} {currency}</Text>
        </HStack>
        <Divider mt="6px" height="1px" width={windowWidth * 0.93} bg='theme.175'/>
      </Box>

      <Box alignSelf="center" alignItems="flex-start" mt="70px" width={windowWidth * 0.93}>
        <Input 
          height="41px"
          width={windowWidth * 0.93}
          borderColor="theme.150"
          color="theme.50"
          placeholder={`Beneficiary ${blockChain} public key`}
          onChangeText={setPublicKey}
        />

        <Input
          mt="39px"
          height="41px"
          width={windowWidth * 0.67}
          borderColor="theme.150"
          color="theme.50"
          placeholder={`Amount of ${currency} you want to transfer`}
          onChangeText={setFounds}
        />
      </Box>

      <Text mt="10px" px="11px" color="#f00">{mes}</Text>

      <Box mt="25px" alignSelf="center">
        <HStack justifyContent="space-between" alignItems="flex-end">
          <Text color="theme.50" fontSize="13px" letterSpacing="1px">REMAINING AMOUNT:</Text> 
          <Text top="3px" color="theme.50" fontSize="18px" fontWeight="bold">{(parseFloat(amount) - parseFloat(founds)).toFixed(4)} {currency}</Text>
        </HStack>
        <Divider mt="6px" height="1px" width={windowWidth * 0.93} bg='theme.175' />
      </Box>

      <Button 
        alignSelf="center"
        mt="auto"
        height="60px"
        width={windowWidth}
        borderTopRadius="10px"
        bg="theme.300"
        variant="filled"
        isLoading={loading}
        isDisabled={disabledButton}
        onPress={() => transferUser()}
      ><Text color="theme.50" fontSize="22px" fontWeight="bold" letterSpacing="2px" >TRANSFER</Text></Button>
    </Box>
  );
}
