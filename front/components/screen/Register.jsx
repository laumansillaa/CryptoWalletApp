import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';
import { extendTheme, NativeBaseProvider, Box, Divider,Stack, Input, Icon, FormControl,WarningOutlineIcon,Heading,Button } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
export default function Register() {
  return (
  
    <FormControl
    isInvalid
    w={{
      base: "100%",
      md: "25%",}}
    style={styles.container}
  >


          <Heading>Register </Heading>
          
      <Stack
      space={4}
      w={{
        base: "85%",
        md: "25%",
      }}
      h={{base: "50%",
        md:"25%"}}
      >  
      
        <Input variant="filled" placeholder="Enter Name" />  
     
        <Input variant="filled" placeholder="Enter Last Name" />  
        <Input variant="filled" placeholder="Filled" />
        <Input  variant="filled"placeholder="Enter Email" />  
        
        <Input  variant="filled"placeholder="Enter Phone" />  
    
        <Input variant="filled" placeholder="Enter Password" />  
        <Button >Send</Button>
      </Stack>
     
  
  </FormControl>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08b6ff',
    
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
