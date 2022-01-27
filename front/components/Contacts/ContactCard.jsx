import React from "react";
import {
  useToast,
  Button,
  HStack,
  VStack,
  useClipboard,
  Center,
  Icon,
  Divider,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
  Modal,
  FormControl,
  Input,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { IP_HOST,DEPLOYED_BACKEND_URL } from "@env";
import { useDispatch } from 'react-redux';
import { getDataUser } from "../../redux/actions";

import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height



export default function ContactCard({ route, navigation }) {
  const { name, ethereumPublicKey, stellarPublicKey, id } = route.params;
  const [showModal, setShowModal] = React.useState(false)
  const toast = useToast()
  const [show, setShow] = React.useState(false)
  const { value, onCopy } = useClipboard()
  const dispatch = useDispatch()
  const [nameChange, setNameChange] = React.useState('')
  const [ethereumPublicKeyChange, setEthereumPublicKeyChange] = React.useState('')
  const [stellarPublicKeyChange, setStellarPublicKeyChange] = React.useState('')
  React.useEffect(() => {
    setNameChange(name)
    setEthereumPublicKeyChange(ethereumPublicKey)
    setStellarPublicKeyChange(stellarPublicKey)
  }, [])

  const handleChangeName = (e) => {
    setNameChange(e.target.value)
  }
  const handleChangeStellar = (e) => {
    setStellarPublicKeyChange(e.target.value)
  }
  const handleChangeEthereum = (e) => {
    setEthereumPublicKeyChange(e.target.value)
  }
  async function onSubmit() {
    try {
      const response = await axios({
        method: "put",
        data: {
          id: id,
          name: nameChange,
          ethereumPublicKey: ethereumPublicKeyChange,
          stellarPublicKey: stellarPublicKeyChange,
        },
        withCredentials: true,
        url: `${DEPLOYED_BACKEND_URL}user/updateContact`,
      });
      dispatch(getDataUser())

    } catch (error) {

      console.error(error);
    }
  }

  return (
    <Box bg="theme.100" height={windowHeight}>
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="theme.300" size="40px" m='7px' />
      </Pressable>
      <Center>
        <Text fontSize="15px" color="theme.300" letterSpacing={4}>CONTACT INFO</Text>
      </Center>

      <Center flex={1}>
        <Box
          width='100%'
          maxWidth="100%"
        >
          <Stack direction="row" alignItems="center">
          </Stack>
        </Box>

        <Box w='80%'>
          <VStack space={2}>
            <Text
              color="theme.150"
              letterSpacing='8px'
              style={{
                textTransform: 'uppercase',
              }}
            >{nameChange}</Text>

            <Divider my="2" bg='theme.150' />

            <VStack alignItems="center" justifyContent="space-between">

              <HStack alignItems="center" space={3}>
                <Text color="theme.50" letterSpacing={4}>Ethereum public key</Text>
                <Button bgColor='theme.300' onPress={() => {
                  onCopy(ethereumPublicKeyChange)
                  setShow(true)
                  toast.show({
                    duration: 1200,
                    placement: "bottom",
                    render: () => {
                      return (
                        <Box bg="theme.300" px="2" py="1" rounded="sm" mb={150}>
                          <Text color='theme.50'> successful copy </Text>
                        </Box>
                      )
                    },
                  })
                }}
                  leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                ></Button>
              </HStack>
              <Text color="theme.150">{ethereumPublicKeyChange}</Text>
            </VStack>

            <Divider my="3" bg='theme.150' />
            <VStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center" space={3}>
                <Text color="theme.50" letterSpacing={4}>Stellar public key</Text>
                <Button bgColor='theme.300' onPress={() => {
                  onCopy(stellarPublicKeyChange)
                  setShow(true)
                  toast.show({
                    duration: 1200,
                    placement: "bottom",
                    render: () => {
                      return (
                        <Box bg="theme.300" px="2" py="1" rounded="sm" mb={150}>
                          <Text color='theme.50'> successful copy </Text>
                        </Box>
                      )
                    },
                  })
                }}
                  leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                  colorScheme="green"
                ></Button>
              </HStack>
              <Text color="theme.150">{stellarPublicKeyChange}</Text>
            </VStack>
            <Divider my="3" bg='theme.150' />
          </VStack>
        </Box>
        <>

          <Button
            variant="outline"
            //colorScheme="theme.300"
            w='50%'
            mb='54'
            mt='2'
            alignSelf='center'
            onPress={() => setShowModal(true)}>
            <Text color='theme.50' letterSpacing={2}>EDIT</Text>
          </Button>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
            <Modal.Content size="100%" >
              <Modal.CloseButton />
              <Modal.Header >
                <Text color='theme.300'>
                  EDIT
                </Text>
              </Modal.Header>
              <Modal.Body>
                <VStack space={1}>
                  <FormControl>
                    <FormControl.Label
                      _text={{
                        color: "theme.300",
                        letterSpacing: '1',
                        fontSize: "14px",
                      }}>Name</FormControl.Label>
                    <Input fontSize='17' value={nameChange} bgColor='theme.150' color='theme.200' onChange={handleChangeName} />
                  </FormControl>
                  <FormControl >
                    <FormControl.Label
                      _text={{
                        color: "theme.300",
                        letterSpacing: '1',
                        fontSize: "14",
                      }}>Ethereum Public Key</FormControl.Label>
                    <Input fontSize='17' value={ethereumPublicKeyChange} bgColor='theme.150' color='theme.200' onChange={handleChangeEthereum} />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label
                      _text={{
                        color: "theme.300",
                        letterSpacing: '1',
                        fontSize: "14",
                      }}>Stellar Public Key</FormControl.Label>
                    <Input fontSize='17' value={stellarPublicKeyChange} bgColor='theme.150' color='theme.200' onChange={handleChangeStellar} />
                  </FormControl>
                </VStack>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="outline"
                    //colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false)
                    }}
                  >
                    <Text color='theme.300'> Cancel </Text>
                  </Button>
                  <Button
                    variant="outline"
                    //colorScheme="theme.300"
                    alignSelf='center'
                    onPress={() => {
                      onSubmit()
                      setShowModal(false)
                      setShow(true)
                      toast.show({
                        duration: 1600,
                        placement: "bottom",
                        render: () => {
                          return (
                            <Box bg="theme.300" px="100" py="6" rounded="sm" mb={90}>
                              <Text color='theme.100'>Successful change</Text>
                            </Box>
                          )
                        },
                      })
                    }}
                  >
                    <Text color='theme.300'> Save </Text>
                  </Button>

                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </>
      </Center>
    </Box>
  )
}
