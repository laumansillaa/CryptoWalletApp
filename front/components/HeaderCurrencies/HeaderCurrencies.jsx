import { Box, Button, Input, ScrollView } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTokernsHard } from '../../redux/actions';
import Criptos from '../Home/components/Criptos';

export default function HeaderCurrencies() {
const dispatch = useDispatch();

function petition(){
  dispatch(getTokernsHard())
}
const [pet, setPet] = useState(0);
const state = useSelector(state => state.tokensHard)
let p 

  React.useEffect(()=>{
   p = setInterval(petition,20000)
  setPet(p)
   
},[])
  return (
    <Box>
       
        <Input placeholder='Buscar token'></Input>
  
        
        <Button onPress={()=>clearInterval(pet)
         }>Detener</Button>
         <Box
            height={600}
            maxHeight="100%"
            
            >
         <ScrollView>
           
        {state?.map((element, index)=>{
          return (<Criptos  key={index} token={element[0]} price={element[1]} />)

        })}
        
      </ScrollView>
      </Box>
    </Box>
  );
}
