import * as React from 'react';


import {

  Box,
  Button,
  IconButton,
  Stack,Text,
  ChevronLeftIcon,
  Center,
  Popover,
  Flex,
  Divider,
  ScrollView,
  
} from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch} from 'react-redux';
import Tokens from './Tokens';
import { useState, useEffect } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import { getBalance } from '../../../redux/actions';



export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
 const balance = useSelector(state => state.userData.balance)
 const [balanceUSD, setBalanceUsd] = useState("");
 const [currencies, setCurrencies] = useState([])
 const [refreshing, setRefreshing] = useState(false);
 const blockChain = useSelector(state => state.blockChain);
 const Tab = createMaterialTopTabNavigator();
 React.useEffect( () => {

  if(blockChain === "stellar"){
    if(balance){
      let usd
      if(balance.stellar) usd = balance.stellar.stakingBalance
      if(usd) usd = parseFloat(usd).toFixed(2);
      setBalanceUsd(usd)
  
      let aux = balance.stellar.currencies?.filter((element) =>element["staking"] )
  
      setCurrencies(aux)

    }
    
  }else if ("ethereum"){

    if(balance){
      let usd
      if(balance.ethereum) usd = balance.ethereum.stakingBalance
      if(usd) usd = parseFloat(usd).toFixed(2);
      let aux = balance.ethereum.currencies?.filter((element) =>element["staking"] )
  
      setCurrencies(aux)
      setBalanceUsd(usd)

    }
   
}},[balance,blockChain])



 useFocusEffect(
  React.useCallback(() => {
    try{
    dispatch(getBalance())

  }catch(e){
    console.log("fail balance")
  }
  
    return  () => {
 };
  }, []));



return (
<>    
 
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{dispatch(getBalance())}}
          />}
        
      >
         
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${balanceUSD} </Text>
          <Box
             bg="darkBlue.900"
             py="5"
             px="1"
             mb={0.2}
             mt={0.5}
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={375}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="white" fontWeight="bold" fontSize="lg" pb="1">
            Currencies in Staking:
            </Text>
      </Box>
          </Box>
          
         <ScrollView mt="5">
           {currencies?.map((element, index)=>{
             return ( <Tokens key={index} currency={element.currency} amount={element.staking} nav={navigation}/>)

           })}
           
          </ScrollView>
       {/*  </Box>  */}

        
       </ScrollView>
      
      </>
 
  );
}