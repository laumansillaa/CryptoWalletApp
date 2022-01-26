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
              rightIcon={<Avatar shadow={5} bg="#3498DB" size="40px" borderColor="darkBlue.900" alignSelf="center">
                <Text color="white" fontWeight="bold" fontSize="xl">{name.charAt(0).toUpperCase()}</Text>
              </Avatar>}
              variant="unstyled"
               /* colorScheme="none" */
            ></Button>
            <Center>
              <Text color="gray.700" fontSize={20}>{name}</Text>
            </Center>
          </HStack>
        </VStack>
      </Pressable>
    </>
  );
}