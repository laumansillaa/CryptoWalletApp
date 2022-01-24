import * as React from 'react';


import {
    PresenceTransition,
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

import { Pressable, RefreshControl } from 'react-native';
import { useState } from 'react';
import UserCriptos from '../UserCriptos';
import StakingUser from './StakingUser';
import { useSelector, useDispatch } from 'react-redux';
import { getBalance } from '../../../redux/actions';


export default function BalanceUser({navigation}) {
    let screenRender
const dispatch = useDispatch()
const [refreshing, setRefreshing] = useState(false);
    const [screen, setScreen]= useState("balance")
   

    
    
        
        if(screen === "balance"){
           screenRender =
           
           <UserCriptos navigation={navigation}/>
     
        
           
        }else if(screen === "staking"){

            screenRender = <StakingUser navigation={navigation}/>
     
        }






    return (
        <>
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{dispatch(getBalance())}}
          />}>
         <Box
          mt="35px"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >
        <Stack direction="row" alignItems="center">
        <Pressable  onPress={()=>navigation.goBack()} >
        <ChevronLeftIcon color="darkBlue.900" size="9"/>
        </Pressable>
        <Pressable onPress={()=>setScreen("balance")}>
           <Text  fontSize="xl" color={(screen=== "balance")?"darkBlue.700":"black"} fontWeight="bold" > YOUR BALANCE </Text> 
           </Pressable>
           <Divider bg="indigo.500" thickness="2" mx="2" orientation="vertical" />
           <Pressable  onPress={()=>setScreen("staking")}>
           <Text  fontSize="xl" color={(screen=== "staking")?"darkBlue.700":"black"} fontWeight="bold" > STAKING </Text> 
            </Pressable>
           
        </Stack>
        </Box>
        
        {screenRender}
        </ScrollView>
        </>
    );
}