import * as React from 'react';
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  VStack,
  Text,
  Avatar
} from 'native-base';

export default function Transaction({action, date, mont, money, from, to}) {
  const blockchain  = useSelector(state => state.blockChain);
  const publicKeys = useSelector(state => state.userData.publicKeys)
  const publicKey = blockchain === "ethereum" ? publicKeys.ethereum : publicKeys.stellar;

  function getTransactionAmountColor(action, from, to) {
    console.log(action, from);
    if (action === "purchase") return "success.600";
    if (action === "transfer" && to === publicKey) return "success.600"
    if (action === "transfer" && from === publicKey) return "error.600"
    else if (action === "sell" || action === "staking") return "error.600";
  }

  return (
    <Box 
      justifyContent="center"
      alignSelf="center"
      m="3px"
      px="4px"
      width="96%"
      height="63px"
      bg="theme.125"
      borderRadius="4px"
    >
      <Stack flexDirection="row" justifyContent="space-around">
        <VStack>
          <Text fontSize="18px" color="theme.50">{`${action[0]?.toUpperCase()}${action?.slice(1)}`}</Text>
          <Text fontSize="12px" color="theme.50">{date}</Text>
        </VStack>

        <VStack>
          <Text fontSize="14px" color="theme.50" alignSelf="flex-end">{money}</Text>
          <Text fontSize="14px" color={getTransactionAmountColor(action, from, to)}>+{parseFloat(mont).toFixed(5)}</Text>
        </VStack>
      </Stack>
    </Box>  
  );
}
