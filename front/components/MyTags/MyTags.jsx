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



export default function MyTags({ navigation }) {
  //const cvu = useSelector(state => state.userData.cvu)
  //para traer cvu del estado descomentar la linea 20, comentar la linea 22 y descomentar del reducer las lineas 18 y 52 
  const [cvu, setCopyCvu] = React.useState("0000003344556600002233")

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
      <Box w='250'>
        <VStack space={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="dark">CVU</Text>
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
