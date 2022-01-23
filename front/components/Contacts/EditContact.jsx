import * as React from 'react';
import {  
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text
} from "native-base"

export default function EditContact({navigation}) {
  return (
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
      <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Edit Contact </Text>
    </Stack>
  </Box>
  );
}
/* import { StyleSheet, } from 'react-native';

import {
  ScrollView,
  NativeBaseProvider,
  Input,
  FormControl,
  WarningOutlineIcon,
  Heading,
  Button,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
  
} from 'native-base';

import { useState, useEffect } from 'react';
import { validateEmail, validateNumber, validateString, validatePin } from '../Utils/Utils';
import axios from "axios"
import { IP_HOST } from "@env"

import { useSelector, useDispatch } from 'react-redux';
import { getDataUser } from '../../redux/actions';

export default function EditContact({ navigation }) {
  const userData = useSelector(state => state.userData.contacts)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    name: "",
    ethereumPublicKey: "",
    stellarPublicKey: "",
  })
  const [error, setError] = useState({
    name: "",
    ethereumPublicKey: "",
    stellarPublicKey: "",
  })

  function validateData(arg) {


    switch (arg) {
      case "name":
        validateString(state.firstname) ? setError({ ...error, firstName: "" }) : setError({ ...error, firstName: "Please enter a valid firstname without special characters" });
        break;
      case "ethereumPublicKey":
        validateString(state.ethereumPublicKey) ? setError({ ...error, ethereumPublicKey: "" }) : setError({ ...error, ethereumPublicKey: "Please enter a public key" });
        break;
      case "stellarPublicKey":
        validateString(state.stellarPublicKey) ? setError({ ...error, stellarPublicKey: "" }) : setError({ ...error, stellarPublicKey: "Please enter a public key" });
        break;
    }

  }


  useEffect(() => { validateData("name") }, [state.name])
  useEffect(() => { validateData('ethereumPublicKey') }, [state.ethereumPublicKey])
  useEffect(() => { validateData('stellarPublicKey') }, [state.stellarPublicKey])




  useEffect(() => {
    setState(userData)

  }, [])

  const handleChange = (e, atr) => {

    setState({ ...state, [atr]: e })
  }


  async function handleSubmit() {
    setMessage("Loading...")
    if (!error.name && !error.ethereumPublicKey && !error.stellarPublicKey) {

      if (state.name && state.ethereumPublicKey && state.stellarPublicKey) {
        try {
          const response = await axios({
            method: "put",
            data: {

              contact: [...{
                name: state.name,
                ethereumPublicKey: state.ethereumPublicKey,
                stellarPublicKey: state.stellarPublicKey
              }]
            },
            withCredentials: true,
            url: `http://${IP_HOST}:3001/user/updateData`,
          })
          dispatch(getDataUser());
          setMessage("Updated information")

          navigation.navigate("AccountComponent");

        } catch (error) { console.error(error) }


      } else {
        setMessage("Please fill all fields");
      }

    } else {
      setMessage("Please review the warnings")
    }


  }

  return (
    <NativeBaseProvider>
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
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Edit Info </Text>
        </Stack>
      </Box>
      <ScrollView>
        <FormControl
          isInvalid
          w={{
            base: "100%",
            md: "25%",
          }}
          style={styles.container}>

          <Stack
            space={4}
            w={{
              base: "85%",
              md: "25%",
            }}

          >

            <Input variant="filled" value={state.firstname} placeholder="Enter Name" onChangeText={(e) => handleChange(e, "firstname")} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error.firstName}
            </FormControl.ErrorMessage>

            <Input variant="filled" value={state.lastname} placeholder="Enter Last Name" onChangeText={(e) => handleChange(e, "lastname")} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error.lastName}
            </FormControl.ErrorMessage>



            <Input variant="filled" value={state.phone} placeholder="Enter Phone" onChangeText={(e) => handleChange(e, "phone")} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error.phone}
            </FormControl.ErrorMessage>

            <Button onPress={handleSubmit}>Confirmar</Button>

            <FormControl.HelperText>
              {message}
            </FormControl.HelperText>
          </Stack>


        </FormControl>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08b6ff',

    alignItems: 'center',
    justifyContent: 'center',

  },
}); */

