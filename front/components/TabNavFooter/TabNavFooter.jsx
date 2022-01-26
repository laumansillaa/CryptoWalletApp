import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountIndex from '../Account/AccountIndex';
import HeaderCurrencies from '../HeaderCurrencies/HeaderCurrencies';
import HomeIndex from '../Home/HomeIndex';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button, Icon,Box,Fab, Text, HStack } from 'native-base';
import CurrenciesIndex from '../HeaderCurrencies/CurrenciesIndex';
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBalance, getBlockChain } from '../../redux/actions';
import ButtonChatBot from '../ChatBot/ButtonChatBot';

const Tab = createMaterialTopTabNavigator();

export default function TabNavFooter({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const dispatch = useDispatch();
    const blockChain = useSelector(state => state.blockChain)
     const userData = useSelector(state=> state.userData); 
     const [funds, setFunds] = useState("")

  

    React.useEffect(()=>{

      if(userData){
        if(userData.balance){
          setFunds(userData.balance.funds.balance)
        }

      }
  
  
    },[userData])
  
  




    return (<>
      
        <Box py="1" alignItems="center">
          <HStack>
            
          <Text fontWeight="bold" color="theme.150" px="1">Funds</Text>
      <Text fontWeight="bold" color="theme.150">{funds?funds:"0.00"} USD</Text> 
          <Text color="theme.300"> Blockchain: {blockChain.charAt(0).toUpperCase() + blockChain.slice(1)}</Text>
          </HStack>
         
        </Box>
        <Tab.Navigator
        tabBarPosition='bottom'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarIndicatorStyle:{
                //top: 0,
                borderBottomColor: '#1f2937',
                borderBottomWidth: 4,
                },     
                //tabBarInactiveTintColor: 'grey',
                //tabBarActiveTintColor: '#1f2937'
                //tabBarStyle: { backgroundColor: "#6ee7b7" }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='home' color='#1f2937' size={8} />) }}
            />
            <Tab.Screen
                name="Currencies"
                component={CurrenciesIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='wallet' color='#1f2937' size={8} />) }}
            />
            <Tab.Screen
                name="Account"
                component={AccountIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='account' color='#1f2937' size={8} />) }}
            />
                    
        </Tab.Navigator>

   
    
        </>
    );
}