import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {

  Box,
 
  Text,

  Button
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../redux/actions';

export default function CardCripto({route, navigation}) {
        const {token} = route.params;
        
       const dispatch = useDispatch();
        const [state, setState] = useState()
        const stateToken = useSelector((state)=> state.tokens)


        React.useEffect(async ()=>{
           
           },[]) 



        useFocusEffect(
            React.useCallback(() => {

                let so;
            
              try{
                so =  (io("http://192.168.1.8:3001"))

                so.emit("token client", token);
                so.on(token, msg =>{
                   setState({name:token,price:msg})
                
                }) 

            }catch(e){
                console.log("failed to connect")
            }
            
              return  () => {
            
                so.disconnect(true);

              
              };
            }, []));
  
    return (
        
   
        <Box 
         bg="indigo.600"
         mt="50px"
         py="5"
         px="3"
         mb="01"
        shadow={9}
         rounded="md"
        
         alignSelf="center"
         width={350}
         
         maxWidth="100%"
         maxHeight="100%"
        >
           {/*  <Text color="#000000">{stateToken.name}</Text>
            <Text color="#000000">{stateToken.price}</Text> */}
            <Button onPress={()=> navigation.goBack()}> back</Button>
            <Text color="#000000">{token}</Text>
            <Text color="#000000">{state?.price}</Text>
        </Box>  
      
  
 
  );
}