import { BACKEND_URL } from "@env"
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Dimensions, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Box,
  VStack, HStack, Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  Divider
} from 'native-base';
import io from "socket.io-client";
import { getTokens } from '../../redux/actions';

export default function CardCripto({route, navigation}) {
  const {token} = route.params;
  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height
  const dispatch = useDispatch();
  const [state, setState] = useState()
  const stateToken = useSelector((state)=> state.tokens)
  const [disabledButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let so;

      try {
        so = io(
          BACKEND_URL === "https://jralvarezwindey-wallet-app.herokuapp.com"
            ? `${BACKEND_URL}:443`
            : BACKEND_URL
        );
        so.emit("token client", token);
        so.on(token, msg =>{
           setState({name:token,price:msg})
          setDisableButton(false)
        });
      } catch(e){ console.error(error) }

      return  () => {
        setLoading(false)
        so.disconnect(true);
      };
    }, [])
  );

  function loadingButton (){
    setLoading(true)
    setTimeout(()=>{
      navigation.navigate("BuyCurrencie", {
        token,
        price:state.price
      })
    }, 1000)
  }  
  
  return (
    <Box bg="theme.100" height={windowHeight}>
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
        ><Text color="theme.300">{token}</Text> PURCHASE</Text> 
      </HStack>

      <Text
        alignSelf="center"
        mt="70px"
        color="theme.50"
        fontSize="22px"
        fontWeight="bold"
        letterSpacing="2px"
      >TOKEN PRICE:</Text> 
      <Divider alignSelf="center" mt="6px" height="1px" width={windowWidth * 0.57} bg='theme.175'/>
        
      <HStack alignSelf="center" mt="33px">
        <Text mt="-0px" mr="11px" fontSize="32px" fontWeight="bold">$</Text>
        <Text fontSize="46px" fontWeight="bold" style={styles.verticallyStretchedText}>{state ? state.price : ""}</Text>
        <Text mb="-0px" ml="7px" alignSelf="flex-end" fontSize="17px" fontWeight="bold">USD</Text>
      </HStack>

      <Button 
        isDisabled={disabledButton}
        isLoading={loading}
        onPress={() => loadingButton()}
        alignSelf="center"
        mt="70px"
        height="46px"
        borderRadius="4px"
        bg="theme.300"
        variant="filled"
      ><Text color="theme.50" fontWeight="bold">Purchase now</Text></Button>
    </Box>   
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.7}]
  }
});
