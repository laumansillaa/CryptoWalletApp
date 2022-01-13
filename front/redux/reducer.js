
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, RETRIEVE_TOKEN} from "./actions"

const initialState={
   Log: false,
   isLoading: true,
   userToken: null,
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
               userToken: action.payload,
               isLoading: false,
               Log: true,
           }
        case LOGOUT:
            return {
                ...state,
                isLoading:false,
                userToken: null,
                Log: false,
            }
        case RETRIEVE_TOKEN:
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            }

            case GET_DATA_USER:
                return{...state, userData:action.payload}
            case DATA_HARD:
                return {...state, userData:action.payload}
           
       default: return state 
    }

};

export default rootReducer;