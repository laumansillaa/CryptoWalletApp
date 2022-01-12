import * as React from 'react';

import { useDispatch, useSelector} from "react-redux"
import { addFounds, getDataUser, getTokernsHard } from '../../redux/actions';
import { useState } from 'react';
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
} from 'native-base';

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
  const [showModal, setShowModal] = useState(false)
  const [founds, setFounds] = useState("");

 
  React.useEffect(async()=>{
    dispatch(getDataUser()) 
    

},[])

  


  return (


    <NativeBaseProvider>

      
    <Box
      bg="primary.600"
      py="5"
      px="8"
      rounded="md"
      alignSelf="center"
      width={375}
      maxWidth="100%"
    >
      <HStack justifyContent="space-between">
        <Box justifyContent="space-between">
          <VStack space="2">
            <Text fontSize="sm" color="white" >
              Hello, {userData.firstname}
            </Text>
            <Text color="white" fontSize="lg" pb="1">
            Your balance ${userData.balance}
            </Text>
          </VStack>
          <Pressable
            rounded="sm"
            bg="primary.400"
            alignSelf="flex-start"
            py="4"
            px="3"
          >
             <Button onPress={() => setShowModal(true)}>Add founds</Button>
          </Pressable>
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
    <Box>
     
    </Box>

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
                  dispatch(addFounds(founds))
                  setShowModal(false)
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
  </NativeBaseProvider>
  );
}