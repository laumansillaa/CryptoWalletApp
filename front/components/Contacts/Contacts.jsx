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
} from "native-base"
import Contact from "./Contact";
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";


export default function Contacts({ navigation }) {
  const [search, setSearch] = useState('')
  const contacts = useSelector(state => state.userData.contacts.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    return 0
  }))
  const [filter, setFilter] = useState([])

  function filtro(nombre) {
    const filtrado = contacts.filter(el => el.name.toLowerCase() === nombre.toLowerCase())
    setFilter(filtrado)
  }

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
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="darkBlue.900" size="9" />
          </Pressable>
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Contacts </Text>
        </Stack>
      </Box>

      <VStack space={5} alignItems="center">
        <Center width="80%">
          <Input
            color='grey.800'
            fontFamily='bold'
            fontSize='19'
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
            }}
            InputRightElement={
              <Button
                onPress={(e) => {
                  e.preventDefault()
                  filtro(search)
                }}
                rightIcon={<Ionicons name="ios-search" />}
                color="#3498DB"
                h='35'
              >
              </Button>
            }
            placeholder="Search"
            variant="filled"
            width="100%"
            bg="gray.300"
            borderRadius="10"
            py="1"
            px="2"
            placeholderTextColor="gray.500"
            _hover={{ bg: 'gray.200', borderWidth: 0 }}
            borderWidth="0"
            _web={{
              _focus: { style: { boxShadow: 'none' } },
            }}
          />
        </Center>
      </VStack>
      <ScrollView mt="5" width="80%" alignSelf='center'>
        {filter.length ?
          filter?.map((contact, index) => {
            return (
              <Contact key={index} name={contact.name} nav={navigation} ethereumPublicKey={contact.ethereumPublicKey} stellarPublicKey={contact.stellarPublicKey} />
            )
          }) :
          contacts?.map((contact, index) => {
            return (
              <Contact key={index} name={contact.name} nav={navigation} ethereumPublicKey={contact.ethereumPublicKey} stellarPublicKey={contact.stellarPublicKey} />
            )
          })
        }
      </ScrollView>
      <Button
        w='50%'
        alignSelf='center'
        onPress={() => navigation.navigate('AddContact')}>
        Add Contact
      </Button>

    </>
  );
}

