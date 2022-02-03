import * as React from 'react';
import {
  Box,
  Stack,
  VStack,
  Text,
  Avatar,
  Button,
  ZStack
} from 'native-base';
import { Pressable, Dimensions } from 'react-native';
import { getCryptoData } from '../../redux/actions';
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import { useSelector,useDispatch } from 'react-redux';


export default function Criptos({symbol, name, price, percDay, img, nav}) {
    
    return (
        <Pressable onPress={()=> nav.navigate("OperationCurrencies", {
            currency:symbol
            })}
        >
            <Box
                bg="theme.125"
                mt="1"
                pl="3"
                mb="2"
                borderWidth="1" 
                borderColor="theme.300" 
                borderRadius={7}
                //shadow={9}
                height={70}
                alignSelf="center"
                width={Dimensions.get('window').width -20}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" mt="1.5">
                        <Stack direction="row" ml="1">
                            <Avatar bg="theme.125" size="md" alignSelf="center" source={{
                                uri: img
                                }}
                            />
                        </Stack>
                        <Stack direction="column" ml="4">
                                <Text fontWeight="bold" fontSize="lg" color="theme.50">{symbol}</Text>
                                <Text fontWeight="normal" fontSize="md"c olor="theme.50">{name}</Text>
                        </Stack>
                    </Stack>
                    <Stack direction="column" mt="1.5" mr="4">
                        <Text fontWeight="semibold" fontSize="lg" color="theme.50">{price}</Text>
                        {percDay[0] === "+" ?
                            <Text fontWeight="normal" fontSize="md" color="success.500">{percDay}</Text> :
                            <Text fontWeight="normal" fontSize="md" color="red.600">{percDay}</Text>
                        }
                    </Stack>
                </Stack>   
            </Box>
        </Pressable>
    );
}
