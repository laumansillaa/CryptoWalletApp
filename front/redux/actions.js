
import axios from "axios";
import {IP_HOST} from "@env"
export const GET_DATA_USER = "GET_DATA_USER";

export const DATA_HARD = "DATA_HARD"
export const LOG = "LOG";
export const LOGOUT = "LOGOUT";


export function Log () {
    return {
        type: LOG,
        payload: null,
    }
}

export function Logout () {
    return {
        type:LOGOUT,
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



export const dataHard= (data)=>{
    return {type:DATA_HARD, payload:data}
}
