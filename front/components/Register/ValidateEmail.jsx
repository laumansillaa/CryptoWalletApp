import axios from "axios";
import { Box, Button, Container, Input, Stack, Text } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Log } from "../../redux/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"


export default function validateEmail ({navigation}) {

    const [token, setToken] = useState("");
    let userToken = useSelector(state => state.userToken);
    const dispatch = useDispatch();


    async function onSubmit() {
        try {
            await axios({
                method: "post",
                data: {
                  token: token
                },
                withCredentials: true,
                url: `${DEPLOYED_BACKEND_URL}session/verifyUser`,
              });
              userToken = token;     




              await AsyncStorage.setItem('userToken', userToken);

              navigation.popToTop();
          /*     dispatch(Log(userToken)); */
        } catch (e) {console.log(e)}
    }

    return (
        <>
        <Box height={windowsHeight} backgroundColor="theme.100">
            <Box width={{
            base: "100%",
            md: "25%",}}
            flex={1}
            alignItems='center'
            justifyContent='center'
           >
            <Stack space={4}
            width={{
            base: "85%",
            md: "25%",
            }}>
                <Text fontWeight='bold' fontSize='12' color="theme.500">Insert your token</Text>
                <Input variant="filled"  placeholder="Token" value={token} onChangeText={setToken} 
                 color='theme.500' backgroundColor= 'theme.400' size= "lg" fontWeight='bold' fontSize='12'/>
                <Button onPress={onSubmit} backgroundColor= 'theme.500'  _text={{fontSize:"md"}}
          borderColor= "darkBlue.50" borderWidth="1">Submit</Button>
            </Stack>
            </Box>
        </Box>
        </>
    )
}


const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000e21',
    
    alignItems: 'center',
    justifyContent: 'center',
    
   
  },
});
