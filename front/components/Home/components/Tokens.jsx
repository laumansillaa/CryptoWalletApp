import * as React from 'react';
import {
  Text,
  Button,
  Avatar,
  Pressable,
  Divider
} from 'native-base';

export default function Tokens({currency, amount, nav}) {
  return (
    <>
      <Pressable 
        onPress={()=>{nav.navigate("OperationCurrencies",{currency})}}
        alignSelf="center"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        m="5px"
        p="10px"
        px="25px"
        width="90%"
        height="50px"
        bg="theme.125"
        borderRadius="2px"
        borderWidth="0.4px"
        borderColor="theme.400"
      >
        <Avatar bg="theme.50" size="33px">
          <Text color="theme.100" fontWeight="bold" fontSize="18px">{currency.charAt(0)}</Text>
        </Avatar>

        <Text ml="15px" fontSize="16px" color="theme.50" letterSpacing="1px">{currency}</Text>

        <Text ml="auto" color="theme.50">{parseFloat(amount).toFixed(5)}</Text>
      </Pressable>
    </>
  );
}
