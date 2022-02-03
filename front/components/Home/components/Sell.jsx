import { BACKEND_URL } from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Pressable } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
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
  useToast,
  HStack,
  Divider
} from 'native-base';
import io from "socket.io-client";
import axios from 'axios';
import { validateFunds } from '../../Utils/Utils';

export default function Sell({route, navigation}) {
  const windowHeight = Dimensions.get("screen").height
  const windowWidth = Dimensions.get("screen").width
  const {currency, amount} = route.params
  const [loading, setLoading] = useState("")
  const toast = useToast()
  const [disabledButton, setDisableButton] = useState(true)
  const [disabledMont, setDisableMont] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const blockChain = useSelector(state => state.blockChain);
  const [urlBlockChain, setUrlBlockChain]= useState("");
  const [founds, setFounds] = useState("0.00");
  const [mes, setMes] = useState("")
  
  React.useEffect(() => {
    setUrlBlockChain(blockChain)
  },[blockChain])

  React.useEffect(()=>{
    if(parseFloat(amount) > 0){
      setDisableMont(false)
    }else{
      setDisableMont(true)
    }
  },[])

  async function transferUser (){
    toast.show({
      title: "Selling...",
      placement: "top"
    });

    setLoading(true)

    try {
      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${BACKEND_URL}/operation/${urlBlockChain}/sell`,
        data: blockChain === "ethereum"
          ? {
            currency: currency,
            amount: founds
          }
          : {
            sellCurrency: currency,
            sellAmount: founds
          }
      });

      setLoading(false)

      toast.show({
        title: response.data,
        placement: "bottom"
      });

      setTimeout(()=>navigation.popToTop(),1000)
    } catch (error) {
      toast.show({
        title: "Error",
        placement: "bottom"
      });

      setDisableButton(true)

      setLoading(false)
    } 
  }


  React.useEffect(() => {
    setMes("")
    if (validateFunds(founds)) {
      if (parseFloat(founds) > 0) {
        if (parseFloat(founds)<= parseFloat(amount)) {
          setMes("");
          setDisableButton(false);
        } else {
          setDisableButton(true);
          setMes(`Insufficient ${currency}`);
        }
      } else {
        setMes("")
      }
    } else {
      setDisableButton(true);
      setMes("Please write a valid amount ");
    }
  }, [founds])

  return (
    <Box height={windowHeight * 0.778} bg="theme.100">
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
        ><Text color="theme.300">{currency}</Text> SELL</Text> 
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
          width={windowWidth * 0.67}
          borderColor="theme.150"
          color="theme.50"
          placeholder={`Amount of ${currency} you want to sell`}
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
      ><Text color="theme.50" fontSize="22px" fontWeight="bold" letterSpacing="2px" >SELL</Text></Button>
    </Box>
  );
}
