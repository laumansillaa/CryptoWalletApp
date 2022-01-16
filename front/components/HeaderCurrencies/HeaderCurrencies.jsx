import { Box, Input, ScrollView } from 'native-base';
import * as React from 'react';
import { useState } from 'react';

import Criptos from './Criptos';


export default function HeaderCurrencies({navigation}) {




const [aux, setAux] = useState([
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "ADAUSDT",
  "XRPUSDT",
  "LUNAUSDT",
  "DOTUSDT",
  "AVAXUSDT",
  "DOGEUSDT",
  "1000SHIBUSDT",
  "MATICUSDT",
  "LINKUSDT",
  "LTCUSDT",
  "ALGOUSDT",
  "XLMUSDT",
  "NEARUSDT",
  "ATOMUSDT",
  ])



  return (
    <Box>
        
        <Input placeholder='Buscar token'></Input>
        
    
         <Box
            height={605}
            maxHeight="100%"
            
            >
         <ScrollView>
<<<<<<< HEAD
           
        {state?.map((element, index)=>{
          return (<Criptos  key={index} token={element[0]} price={element[1]} />)

        })}
=======
>>>>>>> fc8b4a2e7f63a86bf47e5d32c3122d5eb0e8d973
        
         {aux?.map((element, index)=>{
          return <Criptos key ={index} token={element}  nav={navigation} />
        })} 
      </ScrollView>
      </Box>
    </Box>
  );
}