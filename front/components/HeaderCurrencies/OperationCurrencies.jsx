import * as React from 'react';
import { Pressable, RefreshControl } from 'react-native';
import {

    Box,
    Button,
    IconButton,
    Stack,Text,
    ChevronLeftIcon,
    Center,
    ScrollView,
    Avatar,
    VStack,
    HStack
    
  } from 'native-base';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function OperationCurrencies({route, navigation }) {

       const{currency} = route.params 
        const balance = useSelector(state=> state.userData.balance)
        const [amount, setAmount] = useState("")
    const blockChain = useSelector(state=> state.blockChain)
       React.useEffect(()=>{
        if(blockChain === "stellar"){
           let searchStellar = balance.stellar.currencies?.find((element) => element.currency === currency);
            (searchStellar)?setAmount(searchStellar.amount): setAmount("0.00");
        
          }else if ("ethereum"){
            let searchEthereum = balance.ethereum.currencies?.find((element) => element.currency === currency);

            (searchEthereum)?setAmount(searchEthereum.amount): setAmount("0.00");
          }


       },[])
  
       
    
      
     
  


  return (<>
            <Stack  ml="5" mt="60"direction="row" alignItems="center">
          <Pressable  onPress={()=> navigation.goBack()}>
          <ChevronLeftIcon color="darkBlue.900" size="9"/>
          </Pressable>
          </Stack>
          <VStack>
              <Box
              bg="blue.100"
              width={375}
              py="5"
              rounded="xl"
              alignSelf="center"
              alignItems="center"
              >
              <Avatar bg="#ffffff" size="lg"  alignSelf="center">
                <Text color="#000000" fontWeight="bold"fontSize="4xl">{currency.charAt(0)}</Text>
            </Avatar>
             <Text  fontSize="xl" color="darkBlue.900" fontWeight="bold" >{currency} </Text> 
             <Text  fontSize="xl" color="darkBlue.900" fontWeight="bold" > {amount}</Text>
              </Box>
              <Box
             
              width={375}
              py="5"
              rounded="xl"
              alignSelf="center"
              alignItems="center"
              >
            <HStack ml="2"alignItems="center">
            
            <Button mt="9"  ml="2" bg="indigo.600"  fontWeight="bold" 
        onPress={()=>navigation.navigate("UserTransfer",{amount:parseFloat(amount).toFixed(4), currency:currency}) }>Transfer</Button>
             
             <Button mt="9" ml="2" bg="indigo.600"  fontWeight="bold" 
        onPress={()=>navigation.navigate("UserSell",{amount:parseFloat(amount).toFixed(4), currency:currency}) }>Sell</Button>     
                 <Button mt="9" ml="2" bg="indigo.600" fontWeight="bold"  onPress={()=> navigation.navigate("CardCripto", {token:currency})}>Buy</Button>
            
            </HStack>
            </Box>
          </VStack>
          
       


     
  </>

  );
}