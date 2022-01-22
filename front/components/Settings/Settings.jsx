import * as React from 'react';
import {  
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text
} from "native-base"


export default function Settings({navigation}) {
  return (
    <Box
    mt="50px"
    py="1"

    rounded="md"
    alignSelf="center"
    width={375}
    maxWidth="100%"

  >
    <Stack direction="row" alignItems="center">
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="darkBlue.900" size="9" />
      </Pressable>
      <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Settings </Text>
    </Stack>
  </Box>
  );
}