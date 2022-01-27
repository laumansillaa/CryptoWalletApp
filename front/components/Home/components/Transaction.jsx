import * as React from 'react';
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  VStack,
  Text,
  Avatar
} from 'native-base';

export default function Transaction({transaction, action, date, mont, money}) {
  const blockchain  = useSelector(state => state.blockChain);
  const publicKeys = useSelector(state => state.userData.publicKeys)
  const publicKey = blockchain === "ethereum" ? publicKeys.ethereum : publicKeys.stellar;

  function getTransactionAmountColor(transaction) {
    console.log(transaction);
    if (transaction === "purchase") return "success.600";
    if (transaction === "transfer" && transaction.to === publicKey) return "success.600"
    if (transaction === "transfer" && transaction.from === publicKey) return "error.600"
    else if (transaction === "sell" || transaction === "staking") return "error.600";
  }

  return (
    <Box 
      justifyContent="center"
      alignSelf="center"
      m="3px"
      px="4px"
      width="96%"
      height="63px"
      bg="theme.150"
      borderRadius="4px"
    >
      <Stack flexDirection="row" justifyContent="space-around">
        <VStack>
          <Text fontSize="18px" color="theme.50">{`${action[0]?.toUpperCase()}${action?.slice(1)}`}</Text>
          <Text fontSize="12px" color="theme.50">{date}</Text>
        </VStack>

        <VStack>
          <Text fontSize="14px" color="theme.50" alignSelf="flex-end">{money}</Text>
          <Text fontSize="14px" color={getTransactionAmountColor(transaction)}>+{parseFloat(mont).toFixed(5)}</Text>
        </VStack>
      </Stack>
    </Box>  
  );
}
