import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {WebView} from "react-native-webview";
import {IP_HOST, DEPLOYED_BACKEND_URL} from "@env";
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
                url:`${DEPLOYED_BACKEND_URL}payment/process-payment` });
               setUrl(response.data.sandbox);
                setID(response.data.id)
              
        } catch (e) {console.log(e)};
        }
        sendServer();
    },[]);

    
     async function stateChange(state) {
  
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
                    originWhitelist={['*']}
                    style={{ marginTop: 20 }}
                    source={{ uri: url }}
                    startInLoadingState={true}
                  onNavigationStateChange={state => stateChange(state)} 
             /> : <Text>I cant download the page</Text>
        }
        </>
    )
}
