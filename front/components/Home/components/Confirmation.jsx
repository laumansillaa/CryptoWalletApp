import * as React from 'react';
//import { Button } from 'react-native';
import {
    Box,
    Divider,
    HStack,
    VStack,
    Heading,
    Center,
    Icon,
    Button,
    Square,
    ChevronLeftIcon,
    Text,
    View
} from 'native-base';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function Confirmation({ navigation }) {
    const transaction = useSelector(state => state.userData.transactions[0])
    

    React.useEffect(() => {
        console.log(transaction)
    },[transaction]);

    return (
        <View>
        <Center flex={1} px="3" >
            <VStack space={20}>

                <Center>
                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={100} color="#3498DB" />
                </Center>


                <Box width='350'>
                    <Text color="blueGray.400">TRANSACTION TYPE</Text>
                    <Text color="blueGray.400">{transaction?.action}</Text>
                    {console.log(transaction.action)}
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">MONEY</Text>
                    <Text color="blueGray.400">{transaction?.money}</Text>
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">MONT</Text>
                    <Text color="blueGray.400">{transaction?.mont}</Text>
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">DATE</Text>
                    <Text color="blueGray.400">{transaction?.date}</Text>
                    <Divider my="2" />
                </Box>

                <Button
                    onPress={() => navigation.navigate("HomeIndex")}
                    leftIcon={<ChevronLeftIcon color="white" size="10" />}
                    color="#3498DB"
                    h='35'
                >texto
                </Button>
            </VStack>
        </Center>
        </View>
    );
}
