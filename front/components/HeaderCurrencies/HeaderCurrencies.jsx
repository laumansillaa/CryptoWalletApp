import { Box, Button, Input, ScrollView } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens, getTokernsHard, tokenBTCUSDT,tokenETHUSDT } from '../../redux/actions';
import Criptos from './Criptos';
import io from "socket.io-client";

export default function HeaderCurrencies({navigation}) {


const dispatch = useDispatch();
const [aux, setAux] = useState([])
 /* const [BTCUSDT, setBTCUSDT] = useState({})
 const [ETHUSDT, setETHUSDT] = useState({})
const [tokens, setTokens] = useState([BTCUSDT,ETHUSDT]) 
wsbtc.onmessage = (event) =>{
  let price = JSON.parse(event.data);
  setBTCUSDT(price)
 }
 wsetc.onmessage =  (event) =>{
  let price =  JSON.parse(event.data);
  setETHUSDT(price)
 }
React.useEffect(()=>{
  let arr =[]
  */
/*   socket.on("BTCUSDT", msg =>{
    setBTCUSDT({BTCUSDT:msg})
    
  })
   
    
 */
    
  
 /*  socket.on("BNBUSDT", msg =>{
    setTokens({...tokens, BNBUSDT:{"BNBUSDT": msg}});
  })  */
  
/* },[])
 */


React.useEffect(()=>{
  const socket = io("http://192.168.1.8:3001")
  socket.on("BTCUSDT", msg =>{
    dispatch(getTokens({name:"BTCUSDT", price:msg}))})

    socket.on("ETHUSDT", msg =>{
      dispatch(getTokens({name:"ETHUSDT", price:msg}))})
console.log(navigation)

  
},[])

const tokens = useSelector(state => state.tokens)

React.useEffect(()=>{
  let arr = Object.entries(tokens)
  arr = arr.sort(function(a,b){
    if(a[1] > b[1]){
       return 1;
    }
    if(a[1] < b[1]){
       return -1;
    }
    return 0

    });
  setAux(arr);


},[tokens])


  return (
    <Box>
        
        <Input placeholder='Buscar token'></Input>
        
    
         <Box
            height={605}
            maxHeight="100%"
            
            >
         <ScrollView>
    
        {aux?.map((element, index)=>{
          return <Criptos key ={index} token={element[0]} price={element[1]} nav={navigation}/>
        })}
      </ScrollView>
      </Box>
    </Box>
  );
}