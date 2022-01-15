
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, TOKENS_HARD, ADD_FOUNDS, DEPOSIT_TRANSACTION, TOKEN_BTCUSDT,TOKEN_ETHUSDT} from "./actions"

const initialState={
   Log: false,
   userData:{
            
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        pin: "",
        transactions:[],
    
        balance:"0"
        },

    tokens:{
        BTCUSDT:"",
        ETHUSDT:"",}


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
                                    balance: state.userData.balance,
                                    transactions: state.userData.transactions
                                    }}

            case TOKENS_HARD:
                return {...state, tokensHard: action.payload}

            case ADD_FOUNDS:
                return{...state, userData:{...state.userData, balance: parseInt(state.userData.balance) + parseInt(action.payload)}}
                                    
           case DEPOSIT_TRANSACTION:
             let aux = state.userData.transactions;
             aux.unshift(action.payload)
               return {...state, userData:{...state.userData, transactions: aux}}

            case TOKEN_BTCUSDT:
                return {...state, tokens:{...state.tokens, BTCUSDT:action.payload }}

                case TOKEN_ETHUSDT:
                    return {...state, tokens:{...state.tokens, ETHUSDT:action.payload }}
       default: return state 
    }

};

export default rootReducer;