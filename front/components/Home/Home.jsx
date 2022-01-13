import * as React from 'react';

import { useDispatch, useSelector} from "react-redux"
import { addFounds, depositTransaction, getDataUser, getTokernsHard } from '../../redux/actions';
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
  CheckIcon,
  ScrollView,
  extendTheme
} from 'native-base';
import Transaction from './components/Transaction';


export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
  const [showModal, setShowModal] = useState(false)
  const[showModalConfirm, setShowModalConfirm] = useState(false);
  const [founds, setFounds] = useState("");

 
  React.useEffect(async()=>{
    dispatch(getDataUser()) 
    

},[])

  


  return (<Box bg="indigo.100" width={400} alignSelf="center" >
      
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
            Your balance ${userData.balance}
            </Text>
          </VStack>
          
             <Button bg="indigo.400"  onPress={() => setShowModal(true)}><Text color="#ffffff" >Add founds</Text></Button>
         
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
    
    <Box
      bg="blue.100"
      py="1"
      px="3"
      
      rounded="md"
      alignSelf="center"
      width={500}
      height={800}
      maxWidth="100%"
      maxHeight="100%"
    >
<ScrollView>
      <Box
             bg="darkBlue.900"
             py="5"
             px="1"
             mb={0.2}
            shadow={9}
             rounded="md"
             alignSelf="center"
             width={400}
             alignItems="center"
             maxWidth="100%"
             maxHeight="100%"
          >
            <Text color="white" fontSize="lg" pb="1">
            Transactions
            </Text>
          </Box>

          {userData.transactions?.map((element)=>{
            return ( <Transaction 
                      action={element.action}
                      mont={element.mont}
                      money={element.money}
                      date={element.date}

                      />)

          })}
         
          </ScrollView>

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
                  let d = new Date();
                  d = `${d.getDate()}/${1 +parseInt(d.getMonth())}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
                  dispatch(depositTransaction({action:"Deposit", money:"USD", mont: founds, date:d}))
                  setShowModalConfirm(true)
                  setShowModal(false)
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>


      <Modal isOpen={showModalConfirm} onClose={() => setShowModalConfirm(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.CloseButton />
          <Modal.Header>Confirm </Modal.Header>
          <Modal.Body>
          <HStack space={2}>
            <CheckIcon size="5" mt="0.5" color="emerald.500" />
              <Text color="emerald.500" fontSize="md">
                    Amount added correctly
                 </Text>
           </HStack>
          </Modal.Body>
          
        </Modal.Content>
      </Modal>
      </Box>
  );
}