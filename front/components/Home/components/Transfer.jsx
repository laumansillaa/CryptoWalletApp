import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST} from "@env"
import {

  Box,
  
  Stack,Text,
  ChevronLeftIcon,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  VStack,
  ZStack,
  Modal,
  FormControl

  
} from 'native-base';

import { Pressable} from 'react-native';


import { useDispatch, useSelector } from 'react-redux';



export default function Transfer({route, navigation}) {
      const {currency, amount} = route.params
      const [showModal, setShowModal] = useState(false)
    
      const [founds, setFounds] = useState("");
    return (
      <>    
     
           <Box
          mt="50px"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
          <VStack>
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Amount available </Text> 
             
          </VStack>
             
          </Stack>
          </Box>
          <ZStack>
              <Text ml="300px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >{currency} </Text> 
          <Box alignSelf="center" alignItems="center" >
          
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> {amount} </Text>
  {/*         <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${stateToken?.price} </Text> */}
          <Box
             bg="darkBlue.900"
             
             
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={300}
             height={50}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="#ffffff" mt="2" fontWeight="bold" fontSize="lg" pb="1">
             Data :
            </Text>
      </Box>
     
           
          </Box>
          </ZStack>
         
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
                   setShowModal(false)

                   
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
