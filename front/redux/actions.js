
import axios from "axios";
import {IP_HOST} from "@env"
export const GET_DATA_USER = "GET_DATA_USER";
export const LOG = "LOG";
export const LOGOUT = "LOGOUT";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOADING_FALSE = "LOADING_FALSE";
export const TOKEN_LOG = "TOKEN_LOG";
export const TOKEN_LOGOUT = "TOKEN_LOGOUT";
export const TOKENS_HARD = "TOKENS_HARD";
export const ADD_FOUNDS = "ADD_FOUNDS";
export const DEPOSIT_TRANSACTION = "DEPOSIT_TRANSACTION"
export const GET_TOKENS ="GET_TOKENS";
export const GET_BALANCE = "GET_BALANCE"
export const GET_TRANSACTION_USER = "GET_TRANSACTION_USER";
export const GET_BLOCKCHAIN =  "GET_BLOCKCHAIN";

export function Log (payload) {
    return {
        type: LOG,
        payload: payload,
    }
}

export function Logout () {
    return {
        type:LOGOUT,
        payload: null,
    }
}

export function RetrieveToken (payload) {
    return {
        type: RETRIEVE_TOKEN,
        payload: payload,
    }
}

export function LoadingFalse () {
    return {
        type: LOADING_FALSE,
        payload: null,
    }
}

export function TokenLog () {
    return {
        type: TOKEN_LOG,
        payload: null,
    }
}

export function TokenLogOut () {
    return {
        type: TOKEN_LOGOUT,
        payload: null,
    }
}

export const getDataUser = ()=> async dispatch =>{
    try{
    
        // let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        const response = await axios({
              method: "get",
              withCredentials: true,
              url: `http://${IP_HOST}:3001/user/getData`,
            })
        
        const dataUser =  response.data;
        
        dispatch({type:GET_DATA_USER, payload: dataUser})
    }catch(e){
        console.log("Error al consultar")
    }

}

export const geTransactionUser = ()=> async dispatch =>{
    try{
    
        // let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        const response = await axios({
              method: "get",
              withCredentials: true,
              url: `http://${IP_HOST}:3001/operation/record`,
            })
        
        const dataUser =  response.data;
        
        dispatch({type:GET_TRANSACTION_USER, payload: dataUser})
    }catch(e){
        console.log("Error al consultar")
    }

}



export const addFounds = (founds)=>{
    return({type:ADD_FOUNDS, payload:founds})
}

export const depositTransaction = (transaction)=>{
    return({type:DEPOSIT_TRANSACTION, payload:transaction})
}

export const getTokens = (data) =>{
   
    return({type:GET_TOKENS, payload:data})

}

export const getBalance = ()=> async dispatch =>{
    try{
    
        // let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        
            const response = await axios({
                method: "get",
                withCredentials: true,
                url: `http://${IP_HOST}:3001/balance/data`,
              })
          
          const dataUser =  response.data;
          
          dispatch({type:GET_BALANCE, payload: dataUser})
        
       
   
    }catch(e){
        console.log("Error al consultar")
    }

}

export const getBlockChain =(data)=>{
    return{type:GET_BLOCKCHAIN, payload:data}
}