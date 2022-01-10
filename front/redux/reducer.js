
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, GET_LOGIN_USER } from "./actions"

const initialState={
   Log: false,
   userData:{
        
    firstname: "Henry",
    lastname: "Perez",
    email: "henry@gmail.com",
    password: "password00",
    phone: "1144444444",
    pin: "654321",
    img:"https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg"
    },
    userLogin:{}


}

const rootReducer = (state = initialState, action)=>{

    switch(action.type){
       case LOG:
           return {
               ...state,
               Log: true,
           }
        case LOGOUT:
            return {
                ...state,
                Log: false,
            }

            case GET_DATA_USER:
                return{...state, userData:action.payload}
            case DATA_HARD:
                return {...state, userData:action.payload}
           
       default: return state 
    }

};

export default rootReducer;