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



export default function MyTags({ navigation }) {
  const data = useSelector(state => state.userData)
  
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
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >My Tags</Text>
        </Stack>
      </Box>
      <Box width='100%'>
        <VStack space={2}>
          <VStack alignItems="center" justifyContent="space-between">
            <Text color="dark">My ethereum public key</Text>
            <HStack alignItems="center" space={3}>
              <Text color="blueGray.400">{data.publicKeys.ethereum}</Text>
              <Button onPress={() => {
                onCopy(data.publicKeys.ethereum)
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
          </VStack>
          <Divider my="2" bg='emerald.600' />
        </VStack>
      </Box>

      <Box width='100%'>
        <VStack space={2}>
          <VStack alignItems="center" justifyContent="space-between">
            <Text color="dark">My stellar public key</Text>
            <HStack alignItems="center" space={3}>
              <Text color="blueGray.400">{data.publicKeys.stellar}</Text>
              <Button onPress={() => {
                onCopy(data.publicKeys.stellar)
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
          </VStack>
          <Divider my="2" bg='emerald.600' />
        </VStack>
      </Box>
    </Center>
  )
}
