
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, TOKENS_HARD, ADD_FOUNDS} from "./actions"

const initialState={
   Log: false,
   userData:{
        
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    pin: "",
  
    balance:"1000"
    },
    tokensHard:{

    }
   


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

                const {firstname,lastname,email,pin,password,phone} = action.payload
                return {...state, userData: {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    pin: pin,
                                    password:password,
                                    phone:phone,
                                    balance: state.userData.balance
                                    }}

            case TOKENS_HARD:
                return {...state, tokensHard: action.payload}

            case ADD_FOUNDS:
                return{...state, userData:{...state.userData, balance: parseInt(state.userData.balance) + parseInt(action.payload)}}
      
           
       default: return state 
    }

};

export default rootReducer;