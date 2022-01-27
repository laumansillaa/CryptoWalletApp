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

import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height

export default function MyTags({ navigation }) {
  const data = useSelector(state => state.userData)

  const toast = useToast()
  const [show, setShow] = React.useState(false)
  const { value, onCopy } = useClipboard()

  return (
    <Box bg="theme.100" height={windowHeight}>
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="theme.300" size="40px" m='7px' />
      </Pressable>
      <Center>
        <Text fontSize="15px" color="theme.300" letterSpacing={4}>MY KEYS</Text>
      </Center>
      <Center flex={1}>
        <Box
          width='100%'
          maxWidth="100%"
        >
          <Stack direction="row" alignItems="center">
          </Stack>
        </Box>

        <Box w='80%'>
          <VStack space={2}>
            
            <VStack alignItems="center" justifyContent="space-between">

              <HStack alignItems="center" space={3}>
                <Text color="theme.50" letterSpacing={3}>My ethereum public key</Text>
                <Button bgColor='theme.300' onPress={() => {
                  onCopy(data.publicKeys.ethereum)
                  setShow(true)
                  toast.show({
                    duration: 1200,
                    placement: "bottom",
                    render: () => {
                      return (
                        <Box bg="theme.300" px="2" py="1" rounded="sm" mb={150}>
                          <Text color='theme.50'> successful copy </Text>
                        </Box>
                      )
                    },
                  })
                }}
                  leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                ></Button>
              </HStack>
              <Text color="theme.200">{data.publicKeys.ethereum}</Text>
            </VStack>

            <Divider my="3" bg='theme.150' />
            <VStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center" space={3}>
                <Text color="theme.50" letterSpacing={3}>My stellar public key</Text>
                <Button bgColor='theme.300' onPress={() => {
                  onCopy(data.publicKeys.stellar)
                  setShow(true)
                  toast.show({
                    duration: 1200,
                    placement: "bottom",
                    render: () => {
                      return (
                        <Box bg="theme.300" px="2" py="1" rounded="sm" mb={150}>
                          <Text color='theme.50'> successful copy </Text>
                        </Box>
                      )
                    },
                  })
                }}
                  leftIcon={<Icon as={MaterialCommunityIcons} name='content-copy' size={3} />}
                ></Button>
              </HStack>
              <Text color="theme.200">{data.publicKeys.stellar}</Text>
            </VStack>
            <Divider my="3" bg='theme.150' />
          </VStack>
        </Box>

            </Center>
    </Box>
  )
}
