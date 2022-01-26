import { Box, Center, Input, ScrollView, VStack,HStack,Text,ZStack, Button,Heading,Switch, Stack } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import Criptos from './Criptos';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Pressable, Dimensions } from 'react-native';
import { getBalance, getBlockChain, getAllCryptoData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useFocusEffect } from '@react-navigation/native';
import ButtonChatBot from '../ChatBot/ButtonChatBot';


export default function HeaderCurrencies({navigation}) {
    const dispatch = useDispatch();
    const blockChain = useSelector(state => state.blockChain);
    const allCryptoData = useSelector(state => state.allCryptoData);
    const stellar =[  "BTC","ETH", "BNB", "SOL", "ADA", "XRP", "LUNA", "DOT", "AVAX", "DOGE", "SHIB", "MATIC", "LINK", "LTC", "ALGO", "XLM", "NEAR", "ATOM"];
    const ethereum = ["ETH", "HNR", "BTC", "BNB", "ADA", "SOL"];
    const [currencies, setCurrencies] = useState([]);
    let ethCur;

 
    useFocusEffect(
        React.useCallback(() => {
          dispatch(getBalance())
        
          return  () => {
          
          
          };
        }, [])
    );


    React.useEffect(() => {
        if(blockChain === "stellar"){
            setCurrencies(stellar);
            for(var i = 0; i < ethereum.length; i++) {
                allCryptoData.forEach(el => {
                    if(el.symbol === ethereum[i]) {
                        ethCur.push(el)
                    }
                })
            }
        } else {
            setCurrencies(ethereum);
            
        }
    },[blockChain])

    React.useEffect(() => {
        dispatch(getAllCryptoData());
    },[])

    console.log(ethCur)
    return (  
        <>
            <Stack bg="theme.100">
                <Box size="16" width={Dimensions.get('window').width} bg="theme.200" borderBottomRadius="10" alignItems="center">
                    <Text fontSize="2xl" mt="3" fontWeight="bold" color="theme.100">CURRENCIES</Text>
                </Box>
            </Stack>
            <ScrollView bg="theme.100">
                <VStack mt="3" mb="3">
                    {allCryptoData?.map((el, index)=>{
                      return <Criptos key={index} symbol={el.symbol} name={el.name} price={el.price} percDay={el.percDay} img={el.img} nav={navigation}/>
                    })} 
                </VStack>
            </ScrollView>
        </>
    );
}


