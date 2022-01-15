import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {

  Box,
 
  Text,

  Button
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../redux/actions';

export default function CardCripto({route, navigation}) {
        const {token} = route.params;
        const [so, setSo] = useState({});
       const dispatch = useDispatch();
        const [state, setState] = useState()
        const stateToken = useSelector((state)=> state.tokens)

        React.useEffect(async ()=>{
           
            try{
                setSo(io("http://192.168.1.8:3001"))
            }catch(e){
                console.log("failed to disconnect")
            }},[]) 

        React.useEffect(()=>{
            try{
                so.on(token, msg =>{
                    dispatch(getTokens({name:token, price:msg}))}) 
            }catch(e){
                console.log("failed to connect")}},[so])


        function disconnect (){
             
            try{
           
             so.disconnect(true);
            }
            catch(e){
                console.log("failed to disconnect")
            }
    
          
            navigation.goBack()
        }
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
            <Button onPress={()=> disconnect()}> back</Button>
        </Box>  
      
  
 
  );
}