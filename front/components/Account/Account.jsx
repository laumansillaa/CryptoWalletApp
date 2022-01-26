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
import { useSelector, AntDesig } from 'react-redux';

export default function Account({ navigation }) {
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  async function onLogout() {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(Logout());
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <VStack space={4} alignItems="center" justifyContent='flex-end'>
        <Box w='90%'>
          <Text textAlign="center" fontSize={23} color='emerald.400' mt='15'>
            {`${userData.firstname} ${userData.lastname}`}
          </Text>
          <Divider bg='coolGray.800' />
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
<<<<<<< HEAD
                <HStack alignItems="center" justifyContent="space-between" >
=======
                <HStack alignItems="flex-start" justifyContent="space-between" >
>>>>>>> 0fa1c5169d75d91bb92244df4daa3fd23d0a7a1d
                  <HStack>
                    <Icon as={MaterialCommunityIcons} name='face-profile' color='coolGray.800' size={7} alignSelf='center' />
                    <Text alignSelf='center' color='coolGray.900' fontFamily='body' fontWeight={300} fontSize={22} px={3} py={0}>my data</Text>
                  </HStack>
                  <ChevronRightIcon color='coolGray.400' size="9" />
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
<<<<<<< HEAD
                <HStack alignItems="center" justifyContent="space-between">
=======
                <HStack alignItems="flex-start" justifyContent="space-between">
>>>>>>> 0fa1c5169d75d91bb92244df4daa3fd23d0a7a1d
                  <HStack>
                    <Icon as={AntDesign} name='idcard' color='coolGray.800' size={7} alignSelf='center' />
                    <Text alignSelf='center' color='coolGray.900' fontFamily='body' fontWeight={300} fontSize={22} px={3} py={0}>my tags</Text>
                  </HStack>
                  <ChevronRightIcon color='coolGray.400' size="9" />
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

<<<<<<< HEAD
                <HStack alignItems="center" justifyContent="space-between">
=======
                <HStack alignItems="flex-start" justifyContent="space-between">
>>>>>>> 0fa1c5169d75d91bb92244df4daa3fd23d0a7a1d
                  <HStack>
                    <Icon as={AntDesign} name='contacts' color='coolGray.800' size={7} alignSelf='center' />
                    <Text alignSelf='center' color='coolGray.900' fontFamily='body' fontWeight={300} fontSize={22} px={3} py={0}>contacts</Text>
                  </HStack>
                  <ChevronRightIcon color='coolGray.400' size="9" />
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
<<<<<<< HEAD
                <HStack alignItems="center" justifyContent="space-between">
=======
                <HStack alignItems="flex-start" justifyContent="space-between">
>>>>>>> 0fa1c5169d75d91bb92244df4daa3fd23d0a7a1d
                  <HStack>
                    <Icon as={AntDesign} name='logout' color='coolGray.800' size={6} alignSelf='center' />
                    <Text alignSelf='center' color='coolGray.900' fontFamily='body' fontWeight={300} fontSize={22} px={3} py={0}>log out</Text>
                  </HStack>
                </HStack>
              </Box>
            )
          }}


        </Pressable>
        {/*  <Button title="My tags" onPress={() => navigation.navigate("MyTags")} />
        <Button title="Security" onPress={() => navigation.navigate("Security")} />
        <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
        <Button title="Help" onPress={() => navigation.navigate("Help")} />
        <Button title="Contacts" onPress={() => navigation.navigate("ContactsIndex")} />
        <Button title="Log out" onPress={onLogout} /> */}
      </Box>

    </>
  );
}

/* <Box w="100%" h="20" bg="primary.200" shadow={3}>
          <VStack alignItems='center'>
            
            <Avatar shadow={5} bg="#3498DB" size="40px" borderColor="darkBlue.900" alignSelf="center">
              <Text color="white" fontWeight="bold" fontSize="xl">{userData.firstname.charAt(0).toUpperCase()}</Text>
            </Avatar>  
          </VStack>
        </Box>
         */
