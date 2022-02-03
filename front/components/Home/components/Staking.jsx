import { BACKEND_URL } from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useFocusEffect } from '@react-navigation/native';
import { Dimensions, Pressable } from 'react-native';
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
  Divider,
  useToast,
  FormControl,
  HStack
} from 'native-base';
import axios from 'axios';
import io from "socket.io-client";
import { validateFunds } from '../../Utils/Utils';

export default function Staking({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
  const windowWidth = Dimensions.get("window").width
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
      
  React.useEffect(() => {
    let aux 
    if (blockChain === "stellar") {
      setUrlBlockChain("stellar")
      aux = balance.stellar.currencies.find(element => element.currency === currency) 
    } else if(blockChain === "ethereum") {
      aux = balance.ethereum.currencies.find(element => element.currency === currency) 
      setUrlBlockChain("ethereum");
    }

    if (aux) {
      if (parseFloat(aux.staking) > 0) {
        setDisableTakeOut(false)
        setDisableMont(true)
        setFoundsStalking(aux.staking)
      } else {
        if (parseFloat(amount) > 0) {
          setDisableMont(false)
        } else {
          setDisableMont(true)
        }
      }
    }
  }, [blockChain, balance])

 
  async function stakingUser () {
    toast.show({
      title: "Staking...",
      placement: "top"
    });
          
    try {
      setLoading(true)

      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${BACKEND_URL}/operation/${urlBlockChain}/stake`,
        data: {
          stakingCurrency: currency, 
          stakingAmount: founds
        }
      });

      setMes(response.data)

      setLoading(false)

      toast.show({
        title: response.data,
        placement: "bottom"
      });

      setTimeout(() => navigation.popToTop(), 1000)

      toast.show({
        title: response.data,
        placement: "bottom"
      });
    } catch (error) {
      setLoading(false)
      setMes("Staking failed")
      console.error(error);
    } 
  }

  async function stakeTaking() {
    try {
      toast.show({
        title: "Withdrawing...",
        placement: "top"
      });

      setLoadingTakeStake(true)

      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${BACKEND_URL}/operation/${urlBlockChain}/takestake`,
        data: {
          stakingCurrency: currency, 
        }
      });

      setMes(response.data)

      toast.show({
        title: "Success...",
        placement: "top"
      });

      setLoadingTakeStake(false)

      setTimeout(()=>navigation.popToTop(),1000)
    } catch (error) {
      setMes("Failed Staking")
      setLoadingTakeStake(false)
      console.error(error);
    } 
  }

  React.useEffect(() => {
    setMes("");
    if (validateFunds(founds)) {
      if (parseFloat(founds) > 0) {
        if (parseFloat(founds) <= parseFloat(amount)) {
          setMes("");
          setDisableButton(false);
        } else {
          setDisableButton(true);
          setMes(`Insufficient ${currency}`);
        }
      } else {
        setMes("");
      }
    } else {
      setDisableButton(true);
      setMes("Please write a valid amount ");
    }
  }, [founds])

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
        ><Text color="theme.300">{currency}</Text> STAKE</Text> 
      </HStack>

      <HStack alignSelf="center" justifyContent="space-around" alignItems="flex-start" mt="60px" width={windowWidth * 0.93}>
        <Box alignItems="center" p="7px" borderRadius="4px" bg="theme.125">
          <Text color="theme.50" fontSize="13px" letterSpacing="1px">YOUR CURRENT STAKING</Text>
          <Text color="theme.300" fontSize="18px" fontWeight="bold">{parseFloat(foundsStalking).toFixed(2)} {currency}</Text>
        </Box>

        <Button
          isDisabled={disableTakeOut}
          isLoading={loadingTakeStake}
          onPress={stakeTaking}
          height="46px"
          borderRadius="4px"
          bg="theme.300"
          variant="filled"
        ><Text  color="theme.50" fontWeight="bold">Withdraw</Text></Button>
      </HStack>

      <Box alignSelf="center" mt="60px">
        <HStack justifyContent="space-between" alignItems="flex-end">
          <Text color="theme.50" fontSize="13px" letterSpacing="1px">AVAILABLE AMOUNT:</Text> 
          <Text top="3px" color="theme.50" fontSize="18px" fontWeight="bold">{amount} {currency}</Text>
        </HStack>
        <Divider mt="6px" height="1px" width={windowWidth * 0.93} bg='theme.175'/>
      </Box>

      <Box alignSelf="center" alignItems="flex-start" mt="60px" width={windowWidth * 0.93}>
        <Input
          height="41px"
          width={windowWidth * 0.67}
          borderColor="theme.150"
          color="theme.50"
          placeholder={`Amount of ${currency} you want to stake`}
          onChangeText={setFounds}
        />
      </Box>

      <Text mt="10px" px="11px" color="#f00">{mes}</Text>

      <Box mt="15px" alignSelf="center">
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
        onPress={() => stakingUser()}
      ><Text color="theme.50" fontSize="22px" fontWeight="bold" letterSpacing="2px" >STAKE</Text></Button>
    </Box>
  );
}
