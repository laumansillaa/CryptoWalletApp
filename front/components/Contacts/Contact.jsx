import * as React from 'react';
import {
  HStack,
  VStack,
  Text,
  Button,
  Avatar,
  Center
} from 'native-base';
import { Pressable } from 'react-native';

export default function Contact({ name, ethereumPublicKey, stellarPublicKey, id, nav }) {

  return (
    <>
      <Pressable
        width='100%'
        onPress={() => {
          nav.navigate("ContactCard", {
            id,
            name,
            ethereumPublicKey,
            stellarPublicKey
          })
        }}>
        <VStack space={2} width='100%'>
          <HStack alignItems="center" width='100%' >
            <Button
              onPress={() => {
                nav.navigate("ContactCard", {
                  id,
                  name,
                  ethereumPublicKey,
                  stellarPublicKey,
                })
              }}
              rightIcon={<Avatar shadow={5} bg="theme.300" size="40px" alignSelf="center">
                <Text color="theme.50" fontWeight="bold" fontSize="xl" style={{ textTransform: 'uppercase' }}>{name[0]}</Text>
              </Avatar>}
              variant="unstyled"
            /* colorScheme="none" */
            ></Button>
            <Center>
              <Text color="theme.50" letterSpacing={2} spa fontSize={20}>{name}</Text>
            </Center>
          </HStack>
        </VStack>
      </Pressable>
    </>
  );
}
