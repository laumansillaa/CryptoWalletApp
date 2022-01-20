import { Box, Button, Container, Input, Stack, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function ChatBot() {
    const [userMessage, setUserMessage] = useState("");
    const [chatMessage, setChatMessage] = useState(
        [],
    )

    function Response(message) {
        switch (message) {
            case "1": {

            }
        }
    }

    
    useEffect(() => {
        console.log(userMessage);
        // const socket = io("exp://192.168.0.141:19000");
        // socket.on("userMessage", msg => {
        //     setChatMessage({
        //         messages: [...messages, msg],
        //     })
        // });
    }, []);

    function onSend () {
        const socket = io();
        socket.emit("userMessage", userMessage);
        setUserMessage("");
    }
    
     
    
    
    return (
        <>
        <Container>
            <Stack width={500}>
                <Box>
                <Input size="sm" placeholder="Choose an option" value={userMessage} onChangeText={setUserMessage} />
                </Box>
                <Box >
                <Button size="md" onPress={onSend} />
                </Box>
                {chatMessage?.map((msg) => {
            <Text key={msg}>{msg}</Text>
        })}
            </Stack>
        </Container>       
        </>
    )
}

