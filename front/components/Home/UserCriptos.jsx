import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Pressable, RefreshControl, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useFocusEffect } from '@react-navigation/native';
import {
  Box,
  Button,
  IconButton,
  Stack, HStack, Text,
  ChevronLeftIcon,
  Center,
  Popover,
  Flex,
  Divider,
  ScrollView,
} from 'native-base';
import { getBalance } from '../../redux/actions';
import Tokens from './components/Tokens';
import OperationCurrencies from '../HeaderCurrencies/OperationCurrencies';

export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.userData.balance)
  const blockChain = useSelector(state => state.blockChain);
  const [balanceUSD, setBalanceUsd] = useState(0);
  const [currencies, setCurrencies] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const Tab = createMaterialTopTabNavigator();

  React.useEffect( () => {
    if (balance) {
      setBalanceUsd(parseFloat(balance[blockChain]?.cryptoBalance).toFixed(2));
      setCurrencies(balance[blockChain]?.currencies.filter(currency => currency.amount > 0));
    }
    // if(blockChain === "stellar"){
    //   let usd = 0
    // if(balance){
    //   if(balance.hasOwnProperty("stellar")) usd = balance.stellar.cryptoBalance
    //   if(usd) usd = parseFloat(usd).toFixed(2);
    //   setBalanceUsd(usd)
    //   setCurrencies(balance.stellar.currencies)
    // }

    // }else if ("ethereum"){
    // if(balance){
    //   let usd = 0
    //   if(balance.hasOwnProperty("stellar")) usd = balance.ethereum.cryptoBalance
    //   if(usd) usd = parseFloat(usd).toFixed(2);
    //   setCurrencies(balance.ethereum.currencies)
    //   setBalanceUsd(usd)
    // }
    // }
  }, [balance, blockChain])

  useFocusEffect(
    React.useCallback(() => {
      try{
        dispatch(getBalance());
      }catch(error){ console.error(error) }

      return  () => {};
    }, [])
  );

  return (
    <>    
      <HStack 
        alignSelf="center"
        mt="33px"
        height="59px"
      >
        <Text mt="2px" fontSize="26px">$</Text>
        <Text mt="-2px" fontSize="36px" style={styles.verticallyStretchedText}> {balanceUSD} </Text>
        <Text mb="1px" alignSelf="flex-end" fontSize="15px">USD</Text>
      </HStack>

      <Text 
        alignSelf="flex-start"
        justifyContent="center"
        mt="33px"
        pl="14px"
        color="theme.300"
        fontSize="13px"
        letterSpacing="2px"
      >
        {`Your ${blockChain} currencies`.toUpperCase()}
      </Text>

      <Divider alignSelf="center" my="3" width="91%" bg='theme.300'/>
    
      <ScrollView mt="5" >
        {
          currencies?.map((element, index)=>{
            return (
              <Tokens key={index} currency={element.currency} amount={element.amount} nav={navigation}/>
            );
          })
        }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.4}]
  }
});
