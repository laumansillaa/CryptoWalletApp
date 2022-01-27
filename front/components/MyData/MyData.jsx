import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { getDataUser, getDatuSER } from '../../redux/actions';
import { StyleSheet, Dimensions } from "react-native";
import axios from 'axios';
import { IP_HOST } from "@env"
import {
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  NativeBaseProvider,
  Button,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
  Divider,
  Avatar,
} from "native-base"

export default function MyData({ navigation }) {
  const userData = useSelector(state => state.userData);
  const windowsHeight = Dimensions.get("window").height;


  return (
    <>
    <Box bg="theme.100" height={windowsHeight}>
      <Box
        mt="50px"
        py="1"
        rounded="md"
        alignSelf="flex-start"
        // width={375}
        // maxWidth="100%"
      >
        <Stack direction="row" alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="theme.400" size="10" />
          </Pressable>
          <Text ml="105px" fontSize="xl" color="theme.200" fontWeight="bold" >My Data </Text>
        </Stack>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflow="hidden"
        // borderColor="theme.300"
        // borderWidth="1"
        // _dark={{
        //   borderColor: "theme.200",
        //   backgroundColor: "theme.150",
        // }}
        // _web={{
        //   shadow: 2,
        //   borderWidth: 0,
        // }}
        // _light={{
        //   backgroundColor: "theme.100",
        // }}
      >
        <Stack alignItems="center" space={4} justifyContent="space-between" >

          <Box>
            {/* <AspectRatio width="100%" ratio={16 / 9}>
              <Image
              source={{
                uri: userData.img
              }}
              alt="image"
              />
            </AspectRatio> */}
            <Avatar size="2xl"bg="theme.50" source={{
           uri: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80"
          }} >
          <Text fontSize="6xl" color="theme.200">{userData.firstname.charAt(0)}</Text>
      </Avatar>
          </Box>
          <Box
            bg="theme.100"
            _dark={{
              bg: "theme.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            
            bottom="0"
            px="3"
            py="1.5"
          >
            PROFILE
          </Box>
        </Stack>

        <Divider my="3" bg='#ecfeff' />
        
          <Stack alignItems="center" space={1} justifyContent="space-between">
            <Heading size="md" ml="-1">
              {`${userData.firstname} ${userData.lastname}`}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "theme.400",
              }}
              _dark={{
                color: "theme.200",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {userData.email}
            </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="600"
              >
                Phone: {userData.phone}
              </Text>
          </Stack>

          <Divider my="3" bg='#ecfeff' />

          <Stack alignItems="center" space={3} justifyContent="space-between">
            {/* <HStack alignItems="center"> */}
            {/* </HStack> */}
          {/* </HStack>
          <HStack alignItems="center" space={4} justifyContent="space-between"> */}
            
              {/* <Text
                color="theme.500"
                _dark={{
                  color: "theme.200",
                }}
                fontWeight="400"
              > */}
                <Button fontWeight="500" bg="theme.100" onPress={() => navigation.navigate("EditDataUser")}>Edit profile</Button>
              {/* </Text> */}
          </Stack>
        
      </Box>

      </Box>
      </>
  );
}
