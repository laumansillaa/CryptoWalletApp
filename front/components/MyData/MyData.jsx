import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { getDataUser, getDatuSER } from '../../redux/actions';
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
} from "native-base"

export default function MyData({ navigation }) {
  const userData = useSelector(state => state.userData);



  return (
    <Center 
    // flex={1} 
    // px="3" 
    bg="theme.100" 
    height="100%"
    >
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
            <ChevronLeftIcon color="theme.100" size="10" />
          </Pressable>
          <Text ml="105px" fontSize="xl" color="theme.100" fontWeight="bold" >My Data </Text>
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
            <AspectRatio width="100%" ratio={16 / 9}>
              <Image
              source={{
                uri: userData.img
              }}
              alt="image"
              />
            </AspectRatio>
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
            position="absolute"
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
                color: "theme.100",
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
      </Center>
  );
}
