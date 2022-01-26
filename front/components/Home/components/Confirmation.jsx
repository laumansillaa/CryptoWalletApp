import * as React from 'react';
import { useSelector } from 'react-redux';
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
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from 'react';

export default function Confirmation({ navigation }) {
    const transaction = useSelector(state => state.userData.transactions[0])

    return (
        <VStack bg="theme.100" p="20px" height="100%">
            <Center mb="20px">
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={100} color="#3498DB" />
            </Center>

            <Box mt="25px">
                <Text mb="10px">TRANSACTION TYPE</Text>
                <Text>{transaction?.action}</Text>
                <Divider my="2"/>
            </Box>
    
            <Box mt="25px">
                <Text mb="10px">MONEY</Text>
                <Text>{transaction?.money}</Text>
                <Divider my="2"/>
            </Box>

            <Box mt="25px">
                <Text mb="10px">MONT</Text>
                <Text>{transaction?.mont}</Text>
                <Divider my="2"/>
            </Box>

            <Box mt="25px">
                <Text mb="10px">DATE</Text>
                <Text>{transaction?.date}</Text>
                <Divider my="2" />
            </Box>

            <Button
                mt="25px"
                height="48px"
                bg="theme.150"
                leftIcon={<ChevronLeftIcon color="theme.50" size="57px" />}
                onPress={() => navigation.navigate("HomeIndex")}
            >
            </Button>
        </VStack>
    );
}
