import * as React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import {useFocusEffect } from '@react-navigation/native';
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env"
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
import { Dimensions } from 'react-native';

export default function CardCripto({route, navigation}) {
        const {token} = route.params;
        const windowHeight = Dimensions.get("window").height
       const dispatch = useDispatch();
        const [state, setState] = useState()
        const stateToken = useSelector((state)=> state.tokens)
        const [disabledButton, setDisableButton] = useState(true);
        const [loading, setLoading] = useState(false);

       /*  React.useEffect(async ()=>{
           let aux =state;
           if(aux)aux.price =  parseFloat(aux.price).toFixed(4)
            setState(aux)
           },[state]) 
 */


        useFocusEffect(
            React.useCallback(() => {
    
                let so;
            
              try{
                so =  (io(`https://jralvarezwindey-wallet-app.herokuapp.com:443`))

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
                setLoading(false)
                so.disconnect(true);

              
              };
            }, []));

          function loadingButton (){
            setLoading(true)
            setTimeout(()=>{
              navigation.navigate("BuyCurrencie", {
                token,
                price:state.price
              })

            }, 1000)
           


          }  
  
    return (
      <>    
       <Box bg="theme.100"
      height={windowHeight}
      >
     
           <Box
         mt="10"
          py="1"
          
          rounded="md"
          alignSelf="center"
          width={375}
          maxWidth="100%"
         
          >

          <Stack direction="row" alignItems="center">
          <Pressable   onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="theme.50" size="9"/>
          </Pressable>
             <Text ml="70px" fontSize="xl" color="theme.50" fontWeight="bold" >Currency </Text> 
             <Text ml="20px" fontSize="xl" color="theme.300" fontWeight="bold" >{token} </Text> 
          </Stack>
          </Box>
          
          <Box alignSelf="center" alignItems="center" >
          <Text color="theme.50" fontWeight="bold" fontSize="6xl"> ${state?state.price:""} </Text>
  {/*         <Text color="darkBlue.900" fontWeight="bold" fontSize="6xl"> ${stateToken?.price} </Text> */}
          <Box
             bg="theme.400"
             
             
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
        <Button mt="5"  variant="outline" colorScheme="theme" isDisabled={disabledButton} isLoading={loading} onPress={()=> loadingButton()}><Text color="theme.50">
    Buy now:
        </Text>
        
            </Button>
          </Box>
          </Box>   
         
     

     
      </>
  
 
  );
}
