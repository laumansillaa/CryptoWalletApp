import { Box, Center, Input, ScrollView, VStack,HStack,Text,ZStack, Button,Heading,Switch, Stack } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import Criptos from './Criptos';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, Dimensions } from 'react-native';
import { getBalance, getBlockChain, getAllStellarData, getAllEthData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useFocusEffect } from '@react-navigation/native';
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import { Feather } from '@expo/vector-icons'; 


export default function HeaderCurrencies({navigation}) {
    const dispatch = useDispatch();
    const blockChain = useSelector(state => state.blockChain);
    const allStellarData = useSelector(state => state.allStellarData);
    const allEthData = useSelector(state => state.allEthData);
    //const [currencies, setCurrencies] = ({})

    useFocusEffect(
        React.useCallback(() => {
          dispatch(getBalance())
          return  () => {
          };
        }, [])
    );

    // React.useEffect(() => {
    //     if(blockChain === "stellar"){
    //         setCurrencies(allStellarData);
    //     } else {
    //         setCurrencies(allEthData);
    //     }
    // },[blockChain])


    React.useEffect(() => {
        dispatch(getAllStellarData());
        dispatch(getAllEthData());
    },[blockChain])


    return (
        <>
            
            <Stack bg="theme.100">
                <Box size="16" width={Dimensions.get('window').width} bg="theme.300" borderBottomRadius="10" alignItems="center">
                    <Text letterSpacing="1px" fontSize="2xl" mt="3" fontWeight="semibold" color="theme.100">CURRENCIES</Text>
                </Box>
            </Stack>
            <ScrollView bg="theme.100">
                <VStack mt="3" mb="3">
                    {blockChain === "stellar" ?
                        (allStellarData.length === 1 ?
                            <Button mt="40" _text={{color:"theme.50", fontSize:"xl"}} backgroundColor="theme.100" isLoading>LOADING</Button> : 
                            allStellarData.map((el, index)=>{
                                return <Criptos key={index} symbol={el.symbol} name={el.name} price={el.price} percDay={el.percDay} img={el.img} nav={navigation}/>
                        })) :
                        (allEthData.length === 1 ?
                            <Button mt="40" _text={{color:"theme.50", fontSize:"xl"}} backgroundColor="theme.100" isLoading>LOADING</Button> : 
                            allEthData.map((el, index)=>{
                                return <Criptos key={index} symbol={el.symbol} name={el.name} price={el.price} percDay={el.percDay} img={el.img} nav={navigation}/>
                        }))
                    }
                </VStack>
            </ScrollView>
        </>
    );
}
