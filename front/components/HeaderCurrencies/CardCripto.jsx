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
        /* const [so, setSo] = useState({}); */
       const dispatch = useDispatch();
        const [state, setState] = useState()
        const stateToken = useSelector((state)=> state.tokens)


        React.useEffect(async ()=>{
           
           },[]) 



        useFocusEffect(
            React.useCallback(() => {

                let so;
              console.log('Screen was focused');
              try{
                so = (io("http://192.168.1.8:3001"))
                so.on(token, msg =>{
                    dispatch(getTokens({name:token, price:msg}))}) 

            }catch(e){
                console.log("failed to connect")
            }
              // Do something when the screen is focused
              return () => {
                console.log('Screen was unfocused');
                so.disconnect(true);

                // Do something when the screen is unfocused
                // Useful for cleanup functions
              };
            }, []));




        /* 
       
        React.useEffect(()=>{
            try{
                so.on(token, msg =>{
                    dispatch(getTokens({name:token, price:msg}))}) 
            }catch(e){
                console.log("failed to info")}}
                
                
                
                ,[so]) */

          
      
    return (
        
   
        <Box 
         bg="indigo.600"
         
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
            <Text color="#000000">{stateToken.name}</Text>
            <Text color="#000000">{stateToken.price}</Text>
            <Button onPress={()=> navigation.goBack()}> back</Button>
        </Box>  
      
  
 
  );
}