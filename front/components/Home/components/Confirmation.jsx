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
import { useState } from 'react';

export default function Confirmation({ navigation }) {
    const transaction = useSelector(state => state.userData.transactions[0])
    const[state, setState] = useState({})

    React.useEffect(() => {
       setState(transaction)
    },[transaction]);

    return (
       
        <Center mt="10" px="3" >
            <VStack >
         {   console.log(state)}
                <Center>
                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={100} color="#3498DB" />
                </Center>


                <Box width='350'>
                    <Text color="blueGray.400">TRANSACTION TYPE</Text>
                    <Text color="blueGray.400">{state?.action}</Text>
             
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">MONEY</Text>
                    <Text color="blueGray.400">{state?.money}</Text>
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">MONT</Text>
                    <Text color="blueGray.400">{state?.mont}</Text>
                    <Divider my="2" />
                </Box>
                <Box width='350'>
                    <Text color="blueGray.400">DATE</Text>
                    <Text color="blueGray.400">{state?.date}</Text>
                    <Divider my="2" />
                </Box>

                <Button
                    onPress={() => navigation.navigate("HomeIndex")}
                    leftIcon={<ChevronLeftIcon color="white" size="10" />}
                    color="#3498DB"
                    h='35'
                >tedxto
                </Button>
            </VStack>
        </Center>
       
    );
}
