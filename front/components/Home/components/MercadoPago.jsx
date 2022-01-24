import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {WebView} from "react-native-webview";
import {IP_HOST} from "@env";
import { Container, View } from "native-base";

export default function MercadoPago({route}) {
    
    const [url,setUrl] = useState(null);

    useEffect(async () => {
        async function sendServer () {
           try { 
               let response = await axios({
                method: "post",
                data: {
                    unit_price: route.params.price,
                } ,
                withCredentials: true,
                url:`http://${IP_HOST}:3001/payment/process-payment` });
                console.log(response.data.sandbox);
                setUrl(response.data.sandbox);
                console.log(url);
        } catch (e) {console.log(e)};
        }
        sendServer();
    },[]);

    useEffect(()=> {
        console.log(url);
    },[url])
    
    return (
        <>
        <View>
         {
             url && <WebView
             originWhitelist={['*']}
             source={{ uri: url }}
             startInLoadingState={true}
             />
        }
        </View> 
        </>
    )
}