import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { getDataUser, getDatuSER } from '../../redux/actions';
import axios from 'axios';
import {IP_HOST} from "@env"
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Button,
} from "native-base"

export default function MyData({navigation}) {
  const userData = useSelector(state => state.userData);

  const dispatch = useDispatch();

  React.useEffect(async()=>{
     // await axios.post(`http://${IP_HOST}:3001/session/localSignin`, userLogin)
    dispatch(getDataUser()) 
},[])

  return (
    <NativeBaseProvider>
    <Box
    maxW="lg"
    rounded="lg"
    overflow="hidden"
    borderColor="coolGray.200"
    borderWidth="1"
    _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700",
    }}
    _web={{
      shadow: 2,
      borderWidth: 0,
    }}
    _light={{
      backgroundColor: "gray.50",
    }}
  >
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: userData.img
          }}
          alt="image"
        />
      </AspectRatio>
      <Center
        bg="violet.500"
        _dark={{
          bg: "violet.400",
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
      </Center>
    </Box>
    <Stack p="4" space={3}>
      <Stack space={2}>
        <Heading size="md" ml="-1">
          {`${userData.firstname} ${userData.lastname}`}
        </Heading>
        <Text
          fontSize="xs"
          _light={{
            color: "violet.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
        {userData.email}
        </Text>
      </Stack>
      
      <HStack alignItems="center" space={4} justifyContent="space-between">
        <HStack alignItems="center">
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="400"
          >
            Phone: {userData.phone}
          </Text>
        </HStack>
      </HStack>
      <HStack alignItems="center" space={4} justifyContent="space-between">
        <HStack alignItems="center">
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="400"
          >
             <Button onPress={() => navigation.navigate("EditDataUser")}>Editar Perfil</Button>
          </Text>
        </HStack>
      </HStack>
    </Stack>
  </Box>
  </NativeBaseProvider>
  );
}
