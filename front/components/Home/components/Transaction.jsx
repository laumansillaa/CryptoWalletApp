import * as React from 'react';
import {
  Box,
  Stack,
  VStack,
  Text,
  Avatar
} from 'native-base';

export default function Transaction({action, date, mont, money}) {
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
      <Stack
        flexDirection="row"
        justifyContent="space-around"
      >
        {/* <Box aligSelf="center" > */}
        {/*   <Avatar bg="darkBlue.900" size="lg"  alignSelf="center"> */}
        {/*     <Text fontSize="4xl">{money}</Text> */}
        {/*   </Avatar> */}
        {/* </Box> */}

        <VStack>
          <Text fontSize="18px" color="theme.50">{`${action[0]?.toUpperCase()}${action?.slice(1)}`}</Text>
          <Text fontSize="12px" color="theme.50">{date}</Text>
        </VStack>

        <VStack>
          <Text fontSize="14px" color="theme.50" alignSelf="flex-end">{money}</Text>
          <Text fontSize="14px" color="success.400">+{parseFloat(mont).toFixed(5)}</Text>
        </VStack>

      </Stack>
    </Box>  
  );
}
