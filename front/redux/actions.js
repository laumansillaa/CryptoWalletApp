import axios from "axios";
import {IP_HOST} from "@env"
export const GET_DATA_USER = "GET_DATA_USER";
export const GET_LOGIN_USER = "GET_LOGIN_USER"
export const DATA_HARD = "DATA_HARD"

export const getDataUser = ()=> async dispatch =>{
    try{

        let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        let jsonDataUser = await dataUser.json();
        dispatch({type:GET_DATA_USER, payload: jsonDataUser})
    }catch(e){
        console.log("Error al consultar")
    }

}

export const getLoginUser = (data)=> {
    return {type:GET_LOGIN_USER, payload:data}

}

export const dataHard= (data)=>{
    return {type:DATA_HARD, payload:data}
}

