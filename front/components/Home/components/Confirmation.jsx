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
    Text
} from 'native-base';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function Confirmation({ navigation }) {
    const transaction = useSelector(state => state.userData.transactions[0])
 
    return (
        <Center flex={1} px="3" >
            <VStack space={20}>

                <Center>
                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={100} color="#3498DB" />
                </Center>


                <Box w='350'>
                    <Text color="blueGray.400">TRANSACTION TYPE</Text>
                    <Text color="blueGray.400">{transaction?.action}</Text>
                    <Divider my="2" />
                </Box>
                <Box w='350'>
                    <Text color="blueGray.400">MONEY</Text>
                    <Text color="blueGray.400">{transaction?.money}</Text>
                    <Divider my="2" />
                </Box>
                <Box w='350'>
                    <Text color="blueGray.400">MONT</Text>
                    <Text color="blueGray.400">{transaction?.mont}</Text>
                    <Divider my="2" />
                </Box>
                <Box w='350'>
                    <Text color="blueGray.400">DATE</Text>
                    <Text color="blueGray.400">{transaction?.date}</Text>
                    <Divider my="2" />
                </Box>

                <Button
                    onPress={() => navigation.goBack()}
                    leftIcon={<ChevronLeftIcon color="white" size="10" />}
                    color="#3498DB"
                    h='35'
                >
                </Button>
            </VStack>
        </Center>
    );
}
