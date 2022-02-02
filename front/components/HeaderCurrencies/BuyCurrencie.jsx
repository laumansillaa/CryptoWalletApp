import {IP_HOST, BACKEND_URL} from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Dimensions, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Box,
  useToast,
  Stack, HStack, Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  InputRightAddon
} from 'native-base';
import axios from 'axios';
import { geTransactionUser } from '../../redux/actions';
import { validateFunds } from '../Utils/Utils';

export default function BuyCurrencie({route, navigation}) {
  const windowHeight = Dimensions.get("window").height
  const windowWidth = Dimensions.get("window").width
  const {token, price} = route.params;
  const [loading, setLoading] = useState("")
  const [disabled, setDisabled] = useState(true)
  const toast = useToast()
  const [founds, setFounds] = useState("0");
  const dispatch = useDispatch()
  const [mes, setMes] = useState("")
  const blockChain = useSelector(state => state.blockChain);
  const balanceFunds = useSelector(state => state.userData.balance.funds.balance)
  const [blockchainUrl, setBlockchainUrl]= useState("");

  React.useEffect(() => {
    setBlockchainUrl(blockChain)
  },[blockChain])

  React.useEffect(()=>{
    setMes("")
    if( validateFunds(founds)){
      if(parseFloat(founds) > 0){
        if(parseFloat(founds)<= parseFloat(balanceFunds)){
          setMes("")
          setDisabled(false)
        } else{
          setDisabled(true)
          setMes("Insufficient funds")
        }
      }else{
        setMes("")
      }
    }else{
      setDisabled(true)
      setMes("Please enter a valid amount")
    }
  },[founds])

  function handleChange(e){
    setFounds(e)
  }

  async function buyToken(){
     try {
      setLoading(true)

      toast.show({
        title: "Purchasing...",
        placement: "top"
      });

      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${BACKEND_URL}/operation/${blockchainUrl}/purchase`,
        data: {
          amount: founds,
          currency: "USDT",
          purchaseCurrency: token
        },
      });

      dispatch(geTransactionUser());

      toast.show({
        title: response.data,
        placement: "bottom"
  
      });

      setLoading(false);

      setTimeout(()=>navigation.popToTop(),1000)
    } catch (error) {
      setDisabled(true)
      setLoading(false)
      setMes("Purchase failed")
    } 
  }

  return (
    <Box bg="theme.100" height={windowHeight}>
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon mt="20px" ml="10px" color="theme.300" size="40px"/>
      </Pressable>

      <Text
        alignSelf="center"
        mt="50px"
        py="1px"
        px="20px"
        bg="theme.175"
        borderRadius="4px"
        color="theme.100"
        fontSize="27px"
        fontWeight="bold"
        letterSpacing="1px"
      >{token} PRICE:</Text> 
        
      <HStack alignSelf="center" mt="43px">
        <Text mt="-0px" mr="11px" fontSize="32px" fontWeight="bold">$</Text>
        <Text fontSize="46px" fontWeight="bold" style={styles.verticallyStretchedText}>{price}</Text>
        <Text mb="-0px" ml="7px" alignSelf="flex-end" fontSize="17px" fontWeight="bold">USD</Text>
      </HStack>

      <HStack alignSelf="center" justifyContent="space-around" mt="70px" px="20px" width={windowWidth}>
        <InputGroup>
          <InputLeftAddon children={"$"}/>

          <Input
            width="120px"
            placeholder="Amount"
            onChangeText={handleChange}
            _focus={{ borderColor:"theme.300" }}
          />

          <InputRightAddon children={"USD"} />
        </InputGroup>

        <Button 
          isDisabled={disabled}
          isLoading={loading}
          onPress={() => buyToken()}
          height="46px"
          borderRadius="4px"
          bg="theme.300"
          variant="filled"
        ><Text color="theme.50" fontWeight="bold">Purchase</Text></Button>
      </HStack>

      <Text mt="11px" ml="25px" color="#f00">{mes}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.7}]
  }
});
