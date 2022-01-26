import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Pressable, RefreshControl, StyleSheet } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Box,
  Button,
  IconButton,
  HStack,Text,
  ChevronLeftIcon,
  Center,
  Popover,
  Flex,
  Divider,
  ScrollView,
} from 'native-base';
import Tokens from './Tokens';
import { getBalance } from '../../../redux/actions';

export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.userData.balance)
  const blockChain = useSelector(state => state.blockChain);
  const [balanceUSD, setBalanceUsd] = useState("");
  const [currencies, setCurrencies] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const Tab = createMaterialTopTabNavigator();

  React.useEffect( () => {
    if (balance) {
      setBalanceUsd(parseFloat(balance[blockChain]?.stakingBalance).toFixed(2));
      setCurrencies(balance[blockChain]?.currencies);
    }
  }, [balance, blockChain])

  useFocusEffect(
    React.useCallback(() => {
    try{
      dispatch(getBalance())
    }catch(error){ console.error(error) }
  
    return  () => {};
  }, []));

  return (
    <>    
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{dispatch(getBalance())}}
          />
        }
      >
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
          {`Your ${blockChain} staking`.toUpperCase()}
        </Text>

        <Divider alignSelf="center" my="3" width="91%" bg='theme.300'/>
          
        <ScrollView mt="5">
          {
            currencies?.map((currency, index)=>{
              return (
                <Tokens key={index} currency={currency.currency} amount={currency.staking} nav={navigation}/>
              );
            })
          }
        </ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.4}]
  }
});
