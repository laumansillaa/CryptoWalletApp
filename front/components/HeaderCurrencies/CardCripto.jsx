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
  Button

  
} from 'native-base';

import { Pressable} from 'react-native';


import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../redux/actions';


export default function CardCripto({route, navigation}) {
        const {token} = route.params;
        
       const dispatch = useDispatch();
        const [state, setState] = useState()
        const stateToken = useSelector((state)=> state.tokens)
        const [disabledButton, setDisableButton] = useState(true);

       /*  React.useEffect(async ()=>{
           let aux =state;
           if(aux)aux.price =  parseFloat(aux.price).toFixed(4)
            setState(aux)
           },[state]) 
 */


        useFocusEffect(
            React.useCallback(() => {
              console.log("focus")
                let so;
            
              try{
                so =  (io(`http://${IP_HOST}:3001`))

                so.emit("token client", token);
                so.on(token, msg =>{
                  /* dispatch(getTokens({name:token,price:msg})) */
                   setState({name:token,price:msg})
                setDisableButton(false)
                }) 

            }catch(e){
                console.log("failed to connect")
            }
            
              return  () => {
                console.log("unfocus")
                so.disconnect(true);

              
              };
            }, []));
  
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
             <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Currencie </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${state?state.price:""} </Text>
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
             Data {token}:
            </Text>
      </Box>
        <Button isDisabled={disabledButton} onPress={()=> navigation.navigate("BuyCurrencie", {
          token,
          price:state.price
        })}>
            Buy now:
            </Button>
          </Box>
          
         
     

     
      </>
  
 
  );
}
