import * as React from 'react';
import { Text, View} from "react-native";
import { useDispatch} from "react-redux"
import { getDataUser } from '../../redux/actions';
export default function Home() {
  const dispatch = useDispatch();
  
  React.useEffect(async()=>{
    dispatch(getDataUser()) 
},[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
    
  );
}