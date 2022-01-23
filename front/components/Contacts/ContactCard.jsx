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
import { IP_HOST } from "@env";
import { useDispatch } from 'react-redux';
import { getDataUser } from "../../redux/actions";


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
        url: `http://${IP_HOST}:3001/user/updateContact`,
      });
      dispatch(getDataUser())

    } catch (error) {

      console.error(error);
    }
  }

  return (
    <Center flex={1} px="3">
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
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Info </Text>
        </Stack>
      </Box>

      <Box w='80%'>
        <VStack space={2}>
          <Text color="dark">{nameChange.toUpperCase()}</Text>

          <Divider my="2" bg='emerald.600' />

          <VStack alignItems="start" justifyContent="space-between">

            <HStack alignItems="center" space={3}>
              <Text color="dark">Ethereum public key</Text>
              <Button onPress={() => {
                onCopy(ethereumPublicKeyChange)
                setShow(true)
                toast.show({
                  duration: 1200,
                  placement: "bottom",
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        successful copy
                      </Box>
                    )
                  },
                })
              }}
                leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                colorScheme="green"
              ></Button>
            </HStack>
            <Text color="blueGray.400">{ethereumPublicKeyChange}</Text>
          </VStack>

          <Divider my="2" bg='emerald.600' />
          <VStack alignItems="start" justifyContent="space-between">
            <HStack alignItems="center" space={3}>
              <Text color="dark">Stellar public key</Text>
              <Button onPress={() => {
                onCopy(stellarPublicKeyChange)
                setShow(true)
                toast.show({
                  duration: 1200,
                  placement: "bottom",
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        successful copy
                      </Box>
                    )
                  },
                })
              }}
                leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                colorScheme="green"
              ></Button>
            </HStack>
            <Text color="blueGray.400">{stellarPublicKeyChange}</Text>
          </VStack>
          <Divider my="2" bg='emerald.600' />
        </VStack>
      </Box>
      <>
                {/* <Button
                  onPress={() => {
                    setShowModal(false)
                  }}
                >
                  Delete
                </Button> */}
        <Button onPress={() => setShowModal(true)}>Edit</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content size="100%">
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input value={nameChange}  /*  onChangeText={(e)=>{handleChangeName}} */ onChange={handleChangeName}/>
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Ethereum Public Key</FormControl.Label>
                <Input  value={ethereumPublicKeyChange} /*  onChangeText={(e)=>{handleChangeEthereum}} */ onChange={handleChangeEthereum}/>
              </FormControl>
              <FormControl>
                <FormControl.Label>Stellar Public Key</FormControl.Label>
                <Input  value={stellarPublicKeyChange}  /* onChangeText={(e)=>{handleChangeStellar}} */ onChange={handleChangeStellar}/>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                 variant="ghost"
                 colorScheme="blueGray"
                  onPress={() => {
                    onSubmit()
                    setShowModal(false)
                    setShow(true)
                    toast.show({
                      duration: 1600,
                      placement: "bottom",
                      render: () => {
                        return (
                          <Box bg="emerald.500" px="100" py="6" rounded="sm" mb={200}>
                            Successful change
                          </Box>
                        )
                      },
                    })
                  }}
                  /* leftIcon={<Icon as={MaterialCommunityIcons} name="account-plus-outline" size={7} color="white" />}
                  colorScheme="green" */>
                    Save
                </Button>

              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    </Center>
  )
}
