import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { addFounds, depositTransaction, getBalance, getDataUser, getTokernsHard } from '../../redux/actions';
import { useState, useEffect } from 'react';
import {
  Button,
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  Modal,
  FormControl,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  CheckIcon,
  ScrollView,
  extendTheme,
} from 'native-base';
import Transaction from './components/Transaction';

import { SafeAreaView, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
  const [showModal, setShowModal] = useState(false)
  const [balanceUSD, setBalanceUsd] = useState({});
  const [founds, setFounds] = useState("");
  const [loadingState, setLoadingState] = useState(false)

  React.useEffect( () => {
    dispatch(getDataUser())
    dispatch(getBalance("GAW6OVVE3W4C4K7OMO72PHYHLA4WVITT4X7U5UDCEHEQRLIUVS7UCDJL"))
},[])
 
  React.useEffect( () => {
   let usd= userData.balance?.find(element => element.Currency === "USD")
   if(usd) usd.Amount = parseFloat(usd.Amount).toFixed(2);
   setBalanceUsd(usd)
  },[userData.balance])
 

  

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(false)
      setShowModal(false)
    }, 1000);
    if (!loadingState) navigation.navigate('Confirmation')
  }, [loadingState])

  return (<>

    
        <Spinner
          visible={loadingState}
        />


        {/* Componenente balance */}
        <Pressable
        mt="50px"
          onPress={() => {
            navigation.navigate("UserCriptos")
          }}

        >
          <Box
            bg="indigo.600"
            py="5"
            px="8"
            rounded="md"
            alignSelf="center"
            width={375}
            maxWidth="100%"
            shadow={9}
          >
            <HStack justifyContent="space-between">
              <Box justifyContent="space-between">
                <VStack space="2">
                  <Text fontSize="sm" color="white" >
                    Hello, {userData.firstname}
                  </Text>
                  <Text color="white" fontSize="lg" pb="1">
                    Your balance $ {(balanceUSD)?balanceUSD.Amount: ""}
                  </Text>
                </VStack>

                <Button bg="indigo.400" onPress={() => setShowModal(true)}><Text color="#ffffff" >Add founds</Text></Button>

              </Box>
              <Image
                source={{
                  uri: 'https://images.vexels.com/media/users/3/136558/isolated/preview/43cc80b4c098e43a988c535eaba42c53-icono-de-usuario-de-persona.png',
                }}
                alt="Aang flying and surrounded by clouds"
                height="100"
                rounded="full"
                width="100"
              />
            </HStack>


          </Box>
        </Pressable>
      

        {/*componente transactions */}
        <Box
          bg="darkBlue.900"
          py="5"
          px="1"
          mb={0.2}
          mt={0.5}
          shadow={9}
          rounded="md"
          alignSelf="center"
          width={375}
          alignItems="center"
          maxWidth="100%"
          maxHeight="100%"
        >
          <Text color="white" fontSize="lg" pb="1">
            Transactions
          </Text>
        </Box>
     
        <ScrollView>
          <VStack>

            {userData.transactions?.map((element, index) => {
              return (<Transaction key={index}
                action={element.action}
                mont={element.mont}
                money={element.money}
                date={element.date}

              />)

            })}

          </VStack>

        </ScrollView>
    

        {/*Ventana que se abren */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>Add founds</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>how much money do you want to add?</FormControl.Label>
                <InputGroup
                  w={{
                    base: "70%",
                    md: "285",
                  }}
                >
                  <InputLeftAddon children={"$"} />
                  <Input
                    w={{
                      base: "70%",
                      md: "100%",
                    }}
                    placeholder="Amount"
                    onChangeText={setFounds}
                  />

                </InputGroup>

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
                  onPress={() => {
                    
                    let d = new Date();
                    d = `${d.getDate()}/${1 + parseInt(d.getMonth())}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
                    dispatch(depositTransaction({ action: "Deposit", money: "USD", mont: founds, date: d }))
                   
                    //setShowModal(false)
                    setLoadingState(true)
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

     
  </>

  );
}