import { Box, Button, Container, Image, Text } from "native-base";
import {  Dimensions, StatusBar} from "react-native";

export default function SplashScreen ({navigation}) {
    return (
        <Container >
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <Box>
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
                    <Button onPress={()=>navigation.navigate('Login')}>
                    <Text >Get Started</Text>
            </Button>
            </Box>
        </Box>
        </Container>

    )
}


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

