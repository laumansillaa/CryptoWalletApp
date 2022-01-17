import * as React from 'react';


import {

  Box,
  Button,
  IconButton,
  Stack,Text,
  ChevronLeftIcon,
  Center,
  ScrollView,
  
} from 'native-base';
import { useSelector, useDispatch} from 'react-redux';
import Tokens from './components/Tokens';
import { useState, useEffect } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import { getBalance } from '../../redux/actions';


export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
 const balance = useSelector(state => state.userData.balance)
 const [balanceUSD, setBalanceUsd] = useState({});
 const [refreshing, setRefreshing] = useState(false);
 React.useEffect( () => {
  let usd= balance?.find(element => element.Currency === "USD")
  usd.Amount = parseFloat(usd.Amount).toFixed(2)
  
  setBalanceUsd(usd)
 },[balance])

 useFocusEffect(
  React.useCallback(() => {
    try{
    dispatch(getBalance("GAW6OVVE3W4C4K7OMO72PHYHLA4WVITT4X7U5UDCEHEQRLIUVS7UCDJL"))

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
            onRefresh={()=>{dispatch(getBalance("GAW6OVVE3W4C4K7OMO72PHYHLA4WVITT4X7U5UDCEHEQRLIUVS7UCDJL"))}}
          />}
        
      >
           <Box
          mt="50px"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
             <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" > YOUR BALANCE </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${balanceUSD?.Amount} </Text>
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
            Tokens
            </Text>
      </Box>
          </Box>
          
         <ScrollView mt="5">
           {balance?.map((element, index)=>{
             return ( <Tokens key={index} currency={element.Currency} amount={element.Amount}/>)

           })}
           
          </ScrollView>
       {/*  </Box>  */}

        
       </ScrollView>
      </>
 
  );
}