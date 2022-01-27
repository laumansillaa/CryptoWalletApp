import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {
  Box,
  VStack,
  Heading,
  Avatar,
  Pressable,
  Text,
  Button,
  ChevronRightIcon,
  Icon,
  Container, View, HStack,
  Divider
} from 'native-base';
import { useSelector} from 'react-redux';
import axios from 'axios';

import { DEPLOYED_BACKEND_URL } from "@env"
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height

export default function Account({ navigation }) {
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  async function onLogout() {
    try {
      await axios({
        method: "post",
        withCredentials: true,
        url: `${DEPLOYED_BACKEND_URL}session/signout`,
      });
      await AsyncStorage.removeItem('userToken');
      dispatch(Logout());
      console.log("hehe");
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Box bg="theme.100" height={windowHeight}>
        <VStack space={4} alignItems="center" justifyContent='flex-end'>
          <Box w='90%'>

            <Text
              textAlign="center"
              fontSize={18}
              color='theme.300'
              letterSpacing={3}
              style={{ textTransform: 'uppercase' }}
              mt='10'>
              {`${userData.firstname} ${userData.lastname}`}
            </Text>
            <Divider bg='theme.300' my="3" />
          </Box>
        </VStack>
        <Box w='100%' px={3}>
          <Pressable onPress={() => navigation.navigate("MyData")} >
            {({ isPressed }) => {
              return (
                <Box
                  w='100%'
                  py={1}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.90 : 1,
                      },
                    ],
                  }}>
                  <HStack justifyContent="space-between" >
                    <HStack>
                      <Icon as={MaterialCommunityIcons} name='face-profile' color='theme.200' size={7} alignSelf='center' />
                      <Text letterSpacing={1} alignSelf='center' color='theme.150' fontWeight={300} fontSize={18} px={3} py={0}>MY DATA</Text>
                    </HStack>
                    <ChevronRightIcon color='theme.300' size="9" />
                  </HStack>
                </Box>
              )
            }}
          </Pressable>

          <Pressable onPress={() => navigation.navigate("MyTags")}>
            {({ isPressed }) => {
              return (
                <Box
                  w='100%'
                  py={1}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.90 : 1,
                      },
                    ],
                  }}
                >
                  <HStack justifyContent="space-between">
                    <HStack>
                      <Icon as={AntDesign} name='idcard' color='theme.200' size={7} alignSelf='center' />
                      <Text letterSpacing={1} alignSelf='center' color='theme.150' fontFamily='body' fontWeight={300} fontSize={18} px={3} py={0}>MY TAGS</Text>
                    </HStack>
                    <ChevronRightIcon color='theme.300' size="9" />
                  </HStack>
                </Box>
              )
            }}
          </Pressable>

          <Pressable onPress={() => navigation.navigate("ContactsIndex")}>
            {({ isPressed }) => {
              return (
                <Box
                  w='100%'
                  py={1}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.90 : 1,
                      },
                    ],
                  }}
                >

                  <HStack justifyContent="space-between">
                    <HStack>
                      <Icon as={AntDesign} name='contacts' color='theme.200' size={7} alignSelf='center' />
                      <Text letterSpacing={1} alignSelf='center' color='theme.150' fontFamily='body' fontWeight={300} fontSize={18} px={3} py={0}>CONTACTS</Text>
                    </HStack>
                    <ChevronRightIcon color='theme.300' size="9" />
                  </HStack>
                </Box>
              )
            }}
          </Pressable>

          <Pressable onPress={onLogout}>
            {({ isPressed }) => {
              return (
                <Box
                  w='100%'
                  py={1}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.90 : 1,
                      },
                    ],
                  }}
                >
                  <HStack justifyContent="space-between">
                    <HStack>
                      <Icon as={AntDesign} name='logout' color='theme.200' size={6} alignSelf='center' />
                      <Text letterSpacing={1} alignSelf='center' color='theme.150' fontFamily='body' fontWeight={300} fontSize={18} px={3} py={0}>LOG OUT</Text>
                    </HStack>
                  </HStack>
                </Box>
              )
            }}
          </Pressable>
        </Box>
      </Box>
    </>
  );
}
