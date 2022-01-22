import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountIndex from '../Account/AccountIndex';
import HeaderCurrencies from '../HeaderCurrencies/HeaderCurrencies';
import HomeIndex from '../Home/HomeIndex';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button, Icon,Box,Fab } from 'native-base';
import CurrenciesIndex from '../HeaderCurrencies/CurrenciesIndex';
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBalance, getBlockChain } from '../../redux/actions';
import ButtonChatBot from '../ChatBot/ButtonChatBot';

const Tab = createMaterialTopTabNavigator();

export default function TabNavFooter() {
    const [isEnabled, setIsEnabled] = useState(false);
    const dispatch = useDispatch();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    React.useEffect(()=>{
      if(!isEnabled){
        dispatch(getBlockChain("stellar"))
        dispatch(getBalance())
      }else{
        dispatch(getBlockChain("ethereum"))
        dispatch(getBalance())
      }
  
  
    },[isEnabled])
  




    return (<>
        
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
        
      <Fab
      onPress={()=>toggleSwitch()}
      bottom={70}
        borderRadius="full"
        colorScheme="indigo"
        placement="bottom-right"
        icon={
          <Icon
            color="white"
            as={<FontAwesome name="exchange" size={24} color="black" />}
            size="4"
          />
        }
        
      />
    
        </>
    );
}