import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {WebView} from "react-native-webview";
import {IP_HOST} from "@env";
import { Text } from "native-base";
import { useDispatch } from "react-redux";
import { depositTransaction } from "../../../redux/actions";

export default function MercadoPago({route}) {
    
    const [url,setUrl] = useState(null);
    const dispatch = useDispatch();
    const [id,setID] = useState(null);


    

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
                setID(response.data.id)
                console.log(url);
        } catch (e) {console.log(e)};
        }
        sendServer();
    },[]);

    useEffect(()=> {
        console.log(url);
    },[url])
    
    async function stateChange(state) {
        console.log(state);
        let url = state.url;
        if (state.canGoBack == true && !url.includes("mercadopago")) {
            if(url.includes("approved")) {
                let d = new Date();
                d = `${d.getDate()}/${1 + parseInt(d.getMonth())}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;
                dispatch(depositTransaction({ action: "Deposit", money: "USD", mont: route.params.price, date: d }));
                route.params.nav.navigate("Confirmation");
            } else {
                route.params.nav.navigate("Home");
            }
        }
    }

    return (
        <>   
         {
             url ? <WebView 
             style={{ marginTop: 20 }}
            //  originWhitelist={['*']}
             source={{ uri: url }}
             startInLoadingState={true}
             onNavigationStateChange={state => stateChange(state)}
             /> : <Text>I cant download the page</Text>
        }
        </>
    )
}