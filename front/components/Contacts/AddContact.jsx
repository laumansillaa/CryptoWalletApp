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
} from 'native-base';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { IP_HOST } from "@env";
import { getDataUser } from '../../redux/actions';
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function AddContact({ navigation }) {
  const toast = useToast()
  const [show, setShow] = useState(false)

  const [name, setName] = useState('')
  const [ethereumPublicKey, setEthereumPublicKey] = useState('')
  const [stellarPublicKey, setStellarPublicKey] = useState('')
  const dispatch = useDispatch()

  function handleName(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function handleEthereum(e) {
    e.preventDefault()
    setEthereumPublicKey(e.target.value)
  }

  function handleStellar(e) {
    e.preventDefault()
    setStellarPublicKey(e.target.value)
  }

  async function onSubmit() {
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
      dispatch(getDataUser())

    } catch (error) {

      console.error(error);
    }
  }


  return (
    <>

      <Stack
        space={5}
        alignSelf="center"
        px="4"
        safeArea

        mt="4"
        w={{
          base: "100%",
          md: "45%",
        }}
      >
        <Box
          mt="50px"
          py="1"

          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"

        >
          <Stack direction="row" alignItems="center">
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeftIcon color="darkBlue.900" size="9" />
            </Pressable>
            <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Add Contact </Text>
          </Stack>
        </Box>

        <FormControl mb="5">
          <Stack
            space={5}>
            <Box>
              <FormControl.Label
                isRequired
                _text={{
                  color: "gray.700",
                }}>Name</FormControl.Label>
              <Input /*  backgroundColor='rgb(255, 255, 255)'*/ color='gray.800'  fontWeight='bold' fontSize='17' placeholder="name" name='name' onTextChange={handleName} />
            </Box>
            <Box>
              <FormControl.Label
                _text={{
                  color: "gray.700",
                }}>Ethereum Public Key</FormControl.Label>
              <Input /*  backgroundColor='rgb(255, 255, 255)' */ color='gray.800' fontWeight='bold' fontSize='17' placeholder="Ethereum Public Key" name='ethereumPublicKey' onTextChange={handleEthereum} />
            </Box>
            <Box>
              <FormControl.Label
                _text={{
                  color: "gray.700",
                }}>Stellar Public Key</FormControl.Label>
              <Input /* backgroundColor='rgb(255, 255, 255)' */ color='gray.800' fontWeight='bold' fontSize='17' placeholder="Stellar Public Key" name='stellarPublicKey' onTextChange={handleStellar} />

            </Box>
          </Stack>
        </FormControl>
        <Button mt="5" colorScheme="cyan"
          onPress={() => {
            onSubmit()
            navigation.navigate('ContactCard', {
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
                  <Box bg="emerald.500" px="50" py="1" rounded="sm" mb={200}>
                    successful add!
                  </Box>
                )
              },
            })
          }}
          leftIcon={<Icon as={MaterialCommunityIcons} name="account-plus-outline" size={7} color="white" />}
          colorScheme="green">
        </Button>
      </Stack>
    </>
  );
}
