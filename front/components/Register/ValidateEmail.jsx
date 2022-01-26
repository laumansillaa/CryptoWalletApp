import axios from "axios";
import { Box, Button, Container, Input, Stack, Text } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Log } from "../../redux/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP_HOST} from "@env"


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
                url: `http://${IP_HOST}:3001/session/verifyUser`,
              });
              userToken = token;     
              await AsyncStorage.setItem('userToken', userToken);
              dispatch(Log(userToken));
        } catch (e) {console.log(e)}
    }

    return (
        <>
        <Container height={windowsHeight} backgroundColor="coolGray.900">
            <Box width={{
            base: "100%",
            md: "25%",}}
            style={styles.container} >
            <Stack space={4}
            width={{
            base: "85%",
            md: "25%",
            }}>
                <Text>Insert your token</Text>
                <Input variant="filled"  placeholder="Token" value={token} onChangeText={setToken} 
                 color='coolGray.900' backgroundColor= 'darkBlue.50' size= "lg" fontWeight='bold' fontSize='12'/>
                <Button onPress={onSubmit} backgroundColor= 'darkBlue.600'  _text={{fontSize:"md"}}
          borderColor= "darkBlue.50" borderWidth="1">Submit</Button>
            </Stack>
            </Box>
        </Container>
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