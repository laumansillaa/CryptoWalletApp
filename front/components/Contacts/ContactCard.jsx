import React from "react";
import {
  useToast,
  Button,
  HStack,
  VStack,
  useClipboard,
  Center,
  Icon,
  Divider,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector } from "react-redux";



export default function ContactCard({ route, navigation }) {
  const { name, ethereumPublicKey, stellarPublicKey } = route.params;

  const toast = useToast()
  const [show, setShow] = React.useState(false)
  const { value, onCopy } = useClipboard()

  return (
    <Center flex={1} px="3">
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
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >Info </Text>
        </Stack>
      </Box>
      
      <Box w='80%'>
        <VStack space={2}>
          <Text color="dark">{name.toUpperCase()}</Text>

          <Divider my="2" bg='emerald.600' />

          <VStack alignItems="center" justifyContent="space-between">

            <HStack alignItems="center" space={3}>
            <Text color="dark">Ethereum public key</Text>
              <Button onPress={() => {
                onCopy(ethereumPublicKey)
                setShow(true)
                toast.show({
                  duration: 1200,
                  placement: "bottom",
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        successful copy
                      </Box>
                    )
                  },
                })
              }}
                leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                colorScheme="green"
              ></Button>
            </HStack>
              <Text color="blueGray.400">{ethereumPublicKey}</Text>
          </VStack>

          <Divider my="2" bg='emerald.600' />
          <VStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={3}>
            <Text color="dark">Stellar public key</Text>
              <Button onPress={() => {
                onCopy(stellarPublicKey)
                setShow(true)
                toast.show({
                  duration: 1200,
                  placement: "bottom",
                  render: () => {
                    return (
                      <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        successful copy
                      </Box>
                    )
                  },
                })
              }}
                leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                colorScheme="green"
              ></Button>
            </HStack>
              <Text color="blueGray.400">{stellarPublicKey}</Text>
          </VStack>
          <Divider my="2" bg='emerald.600' />
          <Button
      w='50%'
      alignSelf='center'
      onPress={()=> navigation.navigate('EditContact')}>
        Edit
      </Button>
        </VStack>
      </Box>
    </Center>
  )
}
