// import { Button, Container, FormControl, Icon, Input, Text } from "native-base";
// import React, { useState } from "react";
// import { StyleSheet } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons"
// import { validateEmail, validatePassword } from "../Utils/Utils";


// export default function PasswordRecovery() {
    
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState({
//         email:"",
//         password:"",
//         });
//     const [message, setMessage] = useState("");
//     const [password, setPassword] = useState("");
//     const [tokenEmail, setTokenEmail] = useState("");
    
//     function validateData (arg){
//         switch(arg){
//           case "email":
//             validateEmail(email)? setError({...error, email: ""}):setError({...error, email:"Please enter a valid email"});
//           break;
//           case "password":
//             validatePassword(password)? setError({...error, password: ""}):setError({...error, password:"Please enter a 6 to 16 digit password with at least one number and one capital letter"});
//           break;
//         }
//       }
    
//     useEffect(()=>{validateData("password")},[password]);
//     useEffect(()=>{validateData("email")},[email]);
    
//     return (
//         <>
//         <Container>
//             <Center>
//                 <FormControl>
//                 <Stack>
//                     <Text>Put your email for generate a Token</Text>
//                     <Input placeholder="email" value={email} onChangeText={setEmail} InputLeftElement={
//           <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} />
//                     {/* <Button onPress={}>Generate a Token</Button> */}
//                     <Text>Insert the Token</Text>
//                     <Input placeholder="Token"/> value={token}
//                 </Stack>
//                 </FormControl>
//             </Center>
//         </Container>
//         </>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#08b6ff',
      
//       alignItems: 'center',
//       justifyContent: 'center',
     
//     },
//   });