import { Center, Heading, HStack, Image, Spinner } from "native-base";

export default function Loading () {
return (
<Center flex={1} px="3">
  <Image source={require("../../assets/icon.png")} alt="logo" width="200px"
          height="200px" />  
  <HStack space={2} alignItems="center">
    <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="emerald.500" fontSize="md">
        Loading
      </Heading>
  </HStack>
</Center>  
)
}