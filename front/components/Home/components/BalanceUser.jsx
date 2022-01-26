import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pressable, RefreshControl } from 'react-native';
import {
  PresenceTransition, Box, Button,
  IconButton, HStack,Text,
  ChevronLeftIcon, Center, Popover,
  Flex, Divider, ScrollView,
} from 'native-base';
import UserCriptos from '../UserCriptos';
import StakingUser from './StakingUser';
import { getBalance } from '../../../redux/actions';

export default function BalanceUser({navigation}) {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [screen, setScreen]= useState("balance")

  const renderedScreen = screen === "balance" 
    ? <UserCriptos navigation={navigation}/>
    : <StakingUser navigation={navigation}/>;

  return (
    <Box bg="theme.100" height="100%">
      <ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {dispatch(getBalance())}}
          />
        }
      >
        <Box
          width="100%"
        >
          <Pressable  onPress={()=>navigation.goBack()} >
            <ChevronLeftIcon 
              m="7px"
              size="40px"
              color="theme.300" 
            />
          </Pressable>

          <HStack 
            justifyContent="space-around"
            mt="20px"
            px="27px"
          >
            <Pressable onPress={()=>setScreen("balance")}>
              <Text 
                justifyContent="center"
                alignItems="center"
                px="9px"
                height="30px"
                borderRadius="20px"
                color={screen === "balance" ? "theme.300" : "theme.50"} 
                bg={screen === "balance" ? "theme.50" : "theme.100"} 
                fontSize="16px" 
                letterSpacing="4px"
              >
                BALANCE
              </Text> 
            </Pressable>

            <Pressable  onPress={()=>setScreen("staking")}>
              <Text
                justifyContent="center"
                alignItems="center"
                px="9px"
                height="30px"
                borderRadius="20px"
                color={screen === "staking" ? "theme.300" : "theme.50"}
                bg={screen === "staking" ? "theme.50" : "theme.100"} 
                fontSize="16px"
                letterSpacing="4px"
              >
                STAKING
              </Text> 
            </Pressable>
          </HStack>
        </Box>

        {renderedScreen}
      </ScrollView>
    </Box>
  );
};
