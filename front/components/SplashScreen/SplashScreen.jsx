import { Box, Button, Container, Image, Text } from "native-base";
import {  Dimensions, StatusBar} from "react-native";

export default function SplashScreen ({navigation}) {
    return (
        <Box h= '100%' w= '100%' backgroundColor= '#000e21'>
            <StatusBar barStyle="light-content"/>
            <Box backgroundColor= '#000e21'>
                <Image
                source={require('../../assets/icon.png')}
                resizeMode="stretch" height={height_logo}
                width={height_logo} alt="logo"
                />
            </Box>
            <Box>
                <Text >Stay connected with everyone!</Text>
                <Text >Sign in with account</Text>
                <Box >
                        <Button onPress={()=>navigation.navigate('Login')} backgroundColor= 'darkBlue.600' 
                         _text={{fontSize:"md"}}borderRadius= "4px" alignContent={"center"}  justifyContent={"center"}>
                        <Text >Get Started</Text>
                </Button>
                </Box>
            </Box>
        </Box>

    )
}


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

