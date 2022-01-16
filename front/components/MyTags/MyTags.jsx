import React from "react";
import { useSelector } from "react-redux";
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
  Text,
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"



export default function MyTags() {
  //const cvu = useSelector(state => state.userData.cvu)
  //para traer cvu del estado descomentar la linea 20, comentar la linea 22 y descomentar del reducer las lineas 18 y 52 
  const [cvu, setCopyCvu] = React.useState("0000003344556600002233")

  const toast = useToast()
  const [show, setShow] = React.useState(false)
  const { value, onCopy } = useClipboard()

  return (
    <Center flex={1} px="3">
      <Box w='250'>
        <VStack space={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="darck">CVU</Text>
            <HStack alignItems="center" space={3}>
              <Text color="blueGray.400">{cvu}</Text>
              <Button onPress={() => {
                onCopy(cvu)
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
          </HStack>
          <Divider my="2" bg='emerald.600' />
        </VStack>
      </Box>
    </Center>
  )
}
