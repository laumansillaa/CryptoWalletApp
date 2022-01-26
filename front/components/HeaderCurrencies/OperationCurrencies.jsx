import * as React from 'react';
import { Pressable, RefreshControl, Dimensions } from 'react-native';
import {
    Box,
    Button,
    IconButton,
    Stack,Text,
    ChevronLeftIcon,
    Center,
    ScrollView,
    Avatar,
    VStack,
    HStack,
    Image
  } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getBalance, getCryptoData, setCryptoData } from '../../redux/actions';
import { getCryptoChart } from '../../redux/actions';
import Chart2 from './Chart/Chart2';
import { Entypo  } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


export default function OperationCurrencies({ route, navigation }) {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
    const { currency } = route.params;
    const balance = useSelector(state => state.userData.balance);
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();
    const blockChain = useSelector(state => state.blockChain);
    const cryptoData = useSelector(state => state.cryptoData);

    React.useEffect(()=>{
        if(blockChain === "stellar") {
            let searchStellar = balance.stellar.currencies?.find((element) => element.currency === currency);
            (searchStellar)?setAmount(searchStellar.amount): setAmount("0.00");
        } else if(blockChain === "ethereum"){
            let searchEthereum = balance.ethereum.currencies?.find((element) => element.currency === currency);
            (searchEthereum)?setAmount(searchEthereum.amount): setAmount("0.00");
        }
    },[blockChain])

    React.useEffect(() => {
        dispatch(getBalance());
        dispatch(getCryptoChart(currency));
    },[])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getCryptoData(currency));
            return () => {
                dispatch(setCryptoData())
            };
        }, [])
    );


    return (
        <Box height={Dimensions.get('window').height} bg="theme.100">
            <VStack>
                <Box bg="theme.150" width={Dimensions.get('window').width} height={Dimensions.get('window').height /2.25} borderBottomRadius={10} alignSelf="center" alignItems="center">
                    <Stack direction="row" mt="5" mb="5" alignSelf="center">
                        <Pressable onPress={()=> navigation.goBack()}>
                            <ChevronLeftIcon ml="-150" color="theme.50" size="9"/>
                        </Pressable>
                        <Avatar bg="theme.150" size="lg" alignSelf="center" source={(cryptoData.img)?{
                            uri: cryptoData.img
                            } : ""}
                        />
                    </Stack>
                    <Box bg="theme.100" width={Dimensions.get('window').width -20} mt="3" pt="3" pb="3" pl="4" pr="4" borderWidth="1" borderColor="theme.200" borderRadius={7}>
                        <Stack direction="row" justifyContent="space-around" space="xl">
                            <Stack direction="row">
                                <Text fontSize="xl" color="theme.50" fontWeight="semibold" >${cryptoData.price}</Text>
                                    {cryptoData.percDay[0] === "+" ?
                                        <Text fontSize="md" mt="1" color="success.500" fontWeight="normal" > {cryptoData.percDay}</Text> :
                                        <Text fontSize="md" mt="1" color="red.600" fontWeight="normal" > {cryptoData.percDay}</Text>
                                    }
                            </Stack>
                            <Stack direction="row">
                                <Text fontSize="xl" color="theme.50" fontWeight="semibold" >{amount}</Text>
                                <Text fontSize="xl" color="theme.50" fontWeight="semibold" > {currency}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                    <HStack space={6} alignItems="center">
                        <Stack direction="column" alignSelf="center" alignItems="center">
                            <Button
                                mt="9"
                                bg="theme.200"
                                borderRadius="full"
                                onPress={()=>navigation.navigate("UserTransfer",{amount:parseFloat(amount).toFixed(4), currency:currency})}
                            >
                                <Feather name="arrow-up" size={28} color="theme.50" />
                            </Button>
                            <Text color="theme.200" mt="2" fontWeight="normal">TRANSFER</Text>
                        </Stack>
                        <Stack direction="column" alignSelf="center" alignItems="center">
                            <Button
                                mt="9"
                                bg="theme.200"
                                borderRadius="full"
                                onPress={()=> navigation.navigate("CardCripto", {token:currency})}
                            >
                                <Entypo name="plus" size={28} color="theme.50" />
                            </Button>
                            <Text color="theme.200" mt="2" fontWeight="normal">BUY</Text>
                        </Stack>
                        <Stack direction="column" alignSelf="center" alignItems="center">
                            <Button
                                mt="9"
                                bg="theme.200"
                                borderRadius="full"
                                onPress={()=>navigation.navigate("UserSell", {amount:parseFloat(amount).toFixed(4), currency:currency})}
                            >
                                <Entypo name="minus" size={28} color="theme.50" />
                            </Button>
                            <Text color="theme.200" mt="2" fontWeight="normal">SELL</Text>
                        </Stack>
                        <Stack direction="column" alignSelf="center" alignItems="center">
                            <Button
                                mt="9"
                                bg="theme.200"
                                borderRadius="full"
                                onPress={()=> navigation.navigate("StakingCurrencie", {amount:parseFloat(amount).toFixed(4), currency:currency,})}
                            >
                                <MaterialCommunityIcons name="pickaxe" size={28} color="black" />
                            </Button>
                            <Text color="theme.200" mt="2" fontWeight="normal">STAKING</Text>
                        </Stack>
                    </HStack>
                </Box>
            </VStack>
           <VStack alignItems="center" alignSelf="center" mt="10" mb="10">
                <Stack direction="row">
                    <Text fontSize="lg" fontWeight="semibold">LAST MONTH:</Text>
                    {cryptoData.percMonth[0] === "+" ?
                        <Text fontSize="md" mt="0.9" fontWeight="semibold" color="success.500">  {cryptoData.percMonth}</Text> :
                        <Text fontSize="md" mt="0.9" fontWeight="semibold" color="red.600">  {cryptoData.percMonth}</Text>
                    }
                </Stack>
                <Chart2/> 
            </VStack> 
        </Box>
    );
}
