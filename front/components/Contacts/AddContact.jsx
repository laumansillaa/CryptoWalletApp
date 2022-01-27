import React, { useState } from 'react';
import {
  VStack,
  Button,
  FormControl,
  useToast,
  Input,
  Center,
  Box,
  Stack,
  Icon,
  Pressable,
  ChevronLeftIcon,
  Text,
  ScrollView,
} from 'native-base';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { IP_HOST } from "@env";
import { getDataUser } from '../../redux/actions';
import { MaterialCommunityIcons } from "@expo/vector-icons"


import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height


export default function AddContact({ navigation }) {
  const toast = useToast()
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [ethereumPublicKey, setEthereumPublicKey] = useState('')
  const [stellarPublicKey, setStellarPublicKey] = useState('')
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");

  function handleName(e) {

    setName(e)
  }
  function handleEthereum(e) {

    setEthereumPublicKey(e)
  }

  function handleStellar(e) {
    setStellarPublicKey(e)
  }

  async function onSubmit() {
    if (name) {
      if (ethereumPublicKey || stellarPublicKey) {
    try {
      const response = await axios({
        method: "post",
        data: {
          name: name,
          ethereumPublicKey: ethereumPublicKey,
          stellarPublicKey: stellarPublicKey,
        },
        withCredentials: true,
        url: `http://${IP_HOST}:3001/user/addContact`,
      });
      navigation.navigate('ContactCard', {
        name,
        ethereumPublicKey,
        stellarPublicKey
      })
      dispatch(getDataUser())
    } catch (error) {

      console.error(error);
    }
  } else {
    setMessage("Please enter enter a public key")
  }
} else {
  setMessage("Please enter name and public key")
}
  }


  return (
    <>
      <ScrollView
        _contentContainerStyle={{
          minW: "72",
        }}
      >
        <Box bg="theme.100" height={windowHeight} w='100%'>
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="theme.300" size="40px" m='7px' />
          </Pressable>
          <Stack
            space={8}
            alignSelf="center"
            safeArea
            w={{
              base: "90%",
              md: "45%",
            }}
          >
            <FormControl mb="5" >
              <Stack
                space={5}
              >
                <Box >
                  <FormControl.Label
                    _text={{
                      color: "theme.300",
                      letterSpacing: '2'
                    }}>NAME</FormControl.Label>
                  <Input bgColor='theme.150' color='theme.200' fontSize='17' name='name' onChangeText={handleName} />
                </Box>
                <Box>
                  <FormControl.Label
                    _text={{
                      color: "theme.300",
                      letterSpacing: '2'
                    }}>ETHEREUM PUBLIC KEY</FormControl.Label>
                  <Input bgColor='theme.150' color='theme.200' fontSize='17' name='ethereumPublicKey' onChangeText={handleEthereum} />
                </Box>
                <Box>
                  <FormControl.Label
                    _text={{
                      color: "theme.300",
                      letterSpacing: '2'
                    }}>STELLAR PUBLIC KEY</FormControl.Label>
                  <Input bgColor='theme.150' color='theme.200' fontSize='17' name='stellarPublicKey' onChangeText={handleStellar} />

                </Box>
              </Stack>
              <FormControl.HelperText>
                  {message}
                </FormControl.HelperText>
            </FormControl>
          </Stack>
          <Button variant="outline" 
          colorScheme="theme" 
            w='45%'
            mb='54'
            mt='2'
            alignSelf='center'
            onPress={() => {
              onSubmit()
/*                navigation.navigate('ContactCard', {
                name,
                ethereumPublicKey,
                stellarPublicKey
              }) 
              setShow(true)
              toast.show({
                duration: 1200,
                placement: "bottom",
                render: () => {
                  return (
                    <Box bg="theme.300" px="50" py="1" rounded="sm" mb={200}>
                      successful add!
                    </Box>
                  )
                },
              }) */
            }}
          >
            <Text fontSize='14' letterSpacing={1}>ADD CONTACT</Text>
          </Button>
        </Box>
      </ScrollView>
    </>
  );
}
