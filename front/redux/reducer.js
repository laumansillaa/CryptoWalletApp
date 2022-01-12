
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER} from "./actions"

const initialState={
   Log: false,
   userData:{
        
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    pin: "",
    img:""
    },
   


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