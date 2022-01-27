import React from "react";
import {
  ScrollView,
  Button,
  VStack,
  Input,
  Center,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
  Icon
} from "native-base"
import Contact from "./Contact";
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height


export default function Contacts({ navigation }) {
  //const [search, setSearch] = useState('')
  const contacts = useSelector(state => state.userData.contacts.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    return 0
  }))
  const [state, setState] = useState([])
  React.useEffect(() => {
    setState[contacts]
  }, [])

  const [filter, setFilter] = useState([])

  function filtro(e) {
    const filtrado = contacts.filter(el => el.name.toLowerCase() === e.toLowerCase())
    setFilter(filtrado)
  }
  React.useEffect(() => {
    filter.length ? setState(filter) : setState(contacts)
  }, [contacts])
  React.useEffect(() => {
    filter.length ? setState(filter) : setState(contacts)
  }, [filter])

  return (
    <>
      <Box bg="theme.100" height={windowHeight}>
        <Pressable onPress={() => navigation.goBack()} >
          <ChevronLeftIcon color="theme.300" size="9" m='7px' />
        </Pressable>
        <VStack space={5} alignItems="center">
          <Center width="80%">
            <Input
              fontSize='17'
              onChangeText={
                filtro
              }
              InputLeftElement={<Icon as={<Ionicons name="ios-search" />}
                color='theme.200'
                size={7} />
              }
              placeholder="Search"
              letterSpacing={2}
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
            />
          </Center>
        </VStack>
        <ScrollView mt="5" width="80%" alignSelf='center'>
          {state?.map((contact, index) => {
            return (
              <Contact key={index} name={contact.name} nav={navigation} ethereumPublicKey={contact.ethereumPublicKey} stellarPublicKey={contact.stellarPublicKey} id={contact.id} />
            )
          })
          }
        </ScrollView>
        <Button variant="outline" 
        colorScheme="theme"
          w='50%'
          mb='130'
          mt='2'
          alignSelf='center'
          onPress={() => navigation.navigate('AddContact')}>
          <Text fontSize='16' letterSpacing={1}>Add Contact</Text>
        </Button>
      </Box>
    </>
  );
}

