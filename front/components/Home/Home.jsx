import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { addFounds, depositTransaction, getBalance, getDataUser, geTransactionUser, getBlockChain } from '../../redux/actions';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect } from '@react-navigation/native';
import {
  Button,
  NativeBaseProvider,
  Box,
  Divider,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  Modal,
  FormControl,
  Input,
  Icon,
  Center,
  InputGroup,
  InputLeftAddon,
  CheckIcon,
  ScrollView,
  extendTheme,
  Fab,
} from 'native-base';

import Transaction from './components/Transaction';
import ButtonChatBot from '../ChatBot/ButtonChatBot';

export default function Home({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.userData)
  const [showModal, setShowModal] = useState(false)

  const [balanceUSD, setBalanceUsd] = useState("");
  const [founds, setFounds] = useState("");
  const [loadingState, setLoadingState] = useState(false)
  const blockChain = useSelector(state => state.blockChain);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  React.useEffect(()=>{

    

    if(!isEnabled){
      dispatch(getBlockChain("stellar"))
      dispatch(getBalance())
      dispatch(geTransactionUser())
     
     
    }else{
      dispatch(getBlockChain("ethereum"))
      dispatch(getBalance())
      dispatch(geTransactionUser())
   
    }
  navigation.navigate("HomeIndex")

  },[isEnabled])

  React.useEffect( () => {
    dispatch(getDataUser())
    dispatch(getBalance())
    dispatch(geTransactionUser())
  },[])
 
  React.useEffect( () => {
    const usd = userData.balance !== undefined 
      ? parseFloat(userData?.balance[blockChain]?.cryptoBalance).toFixed(2) 
      : 0;
    setBalanceUsd(usd);
    // if(blockChain === "stellar"){
    //   let usd
    //   if (userData.hasOwnProperty("balance")) usd = userData.balance.stellar.cryptoBalance
    //   if (usd) usd = parseFloat(usd).toFixed(2);
    //   setBalanceUsd(usd)
    // } else if ("ethereum"){
    //   let usd
    //   if (userData.hasOwnProperty("balance")) usd = userData.balance.ethereum.cryptoBalance
    //   if (usd) usd = parseFloat(usd).toFixed(2);
    //   setBalanceUsd(usd)
    // }
  },[userData.balance])
 
  useFocusEffect(
    React.useCallback(() => {
      try{
        dispatch(getBalance())
      } catch(error) { console.error(error) }

      return  () => { };
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(false)
      setShowModal(false)
    }, 1000);

    if (!loadingState) navigation.navigate('Confirmation')
  }, [loadingState])

  return (
    <Box bg="theme.100" height="100%">
      <Spinner
        visible={loadingState}
      />

      {/* Crypto balance. */}
      <Box
        alignSelf="center"
        justifyContent="space-between"
        pt="23px"
        pb="13px"
        height="180px"
        width="81%"
        bg="theme.100"
      >
        <Text 
          alignSelf="flex-start"
          fontSize="11px"
          letterSpacing="1px"
        >
          Your funds
        </Text>

        <HStack 
          alignSelf="center"
          height="59px"
        >
          <Text mt="2px" fontSize="26px">$</Text>
          <Text mt="-2px" fontSize="36px" style={styles.verticallyStretchedText}> {balanceUSD} </Text>
          <Text mb="1px" alignSelf="flex-end" fontSize="15px">USD</Text>
        </HStack>

        <Button  
          onPress={() => setShowModal(true)}
          alignSelf="flex-end"
          p="6px"
          bg="theme.50"
          borderRadius="4px"
        >
          <Text 
            color="theme.150" 
            fontSize="11px"
          >
           Add funds
          </Text>
        </Button>
      </Box>

      <Divider alignSelf="center" my="3" w="81%" bg='theme.150' />

      <Pressable 
        onPress={() => { navigation.navigate("BalanceUser") }} 
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        m="3px"
        mt="17px"
        px="7px"
        width = "093%"
        height="41px"
        borderRadius="40px"
        bg="theme.300"
      >
        <Text color="theme.100" fontSize="12px" letterSpacing="2px">
          CHECK YOUR {blockChain.toUpperCase()} CURRENCIES
        </Text>
      </Pressable>

      {/* Operations. */}
      <Box
        justifyContent="center"
        alignSelf="center"
        mt="40px"
        width="96%"
        rounded="4px"
      >
        <Text 
          pl="7px"
          color="theme.300"
          fontSize="13px"
          letterSpacing="2px"
        >
          {`${blockChain} transactions`.toUpperCase()}
        </Text>
      </Box>

      <Divider alignSelf="center" my="3" w="91%" bg='theme.300' />
   
      <ScrollView>
        <VStack>
          {userData.transactionCurren ?.filter(transaction => transaction.blockchain === blockChain) .map((element, index) => {
            const utcDate = element.createdAt;
            const utcHour = Number(utcDate.slice(11,13));
            let transactionDate;
            if (utcHour < 3) {
              transactionDate = `${utcDate.slice(0,4)}/${utcDate.slice(5,7)}/${(Number(utcDate.slice(8,10)) - 1)} - ${24 + Number(utcDate.slice(11,13))-3}:${utcDate.slice(14,16)}`
            } else {
              transactionDate = `${utcDate.slice(0,4)}/${utcDate.slice(5,7)}/${utcDate.slice(8,10)} - ${Number(utcDate.slice(11,13))-3}:${utcDate.slice(14,16)}`
            }
            return (
              <Transaction key={index}
                action={element.operationType}
                mont={element.purchasedAmount}
                money={element.purchasedCurrency}
                date={transactionDate}
              />
            )
          })}
        </VStack>
      </ScrollView>
      <Fab
      onPress={()=>toggleSwitch()}
      bottom={70}
        borderRadius="full"
        bg="theme.300"
        placement="bottom-right"
        icon={
          <Icon
            color="white"
            as={<FontAwesome name="exchange" size={24} color="black" />}
            size="4"
          />
        }
        
      />
      
    
      {/* Mercadopago payment modal. */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content >
          <Modal.CloseButton />

          <Modal.Header>Add funds</Modal.Header>


     
    
          <Modal.Body>
            <FormControl>
              <FormControl.Label>How much money do you want to add?</FormControl.Label>
               
              <InputGroup
                w={{
                  base: "70%",
                  md: "285",
                }}
              >
                <InputLeftAddon children={"$"} />

                <Input
                  w={{
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
                  let d = new Date();
                  d = `${d.getDate()}/${1 + parseInt(d.getMonth())}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
                  dispatch(depositTransaction({ action: "Deposit", money: "USD", mont: founds, date: d }))
                  setLoadingState(true)
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.4}]
  }
});
