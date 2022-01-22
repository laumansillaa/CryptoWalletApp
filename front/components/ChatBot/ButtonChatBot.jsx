import React from "react";
import { Box, Container, IconButton } from "native-base";

import { AntDesign } from '@expo/vector-icons';

export default function ButtonChatBot ({nav}) {

    

    return (
        <>
        <Container >
        <Box position="absolute"  left={2} bottom={2} >
            <IconButton onPress={() => nav.navigate("ChatBot")}  borderRadius={55}
            colorScheme="indigo"
            variant={"outline"}
            _icon={{
              as: AntDesign,
              name: "customerservice",
              size:8,
              color: "black"
            }}
          />
        </Box>
        </Container>
        </>
    )
}