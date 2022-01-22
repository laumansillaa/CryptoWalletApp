
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, TOKENS_HARD, ADD_FOUNDS, DEPOSIT_TRANSACTION, RETRIEVE_TOKEN, LOADING_FALSE, GET_TOKENS, GET_BALANCE, GET_TRANSACTION_USER} from "./actions"

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
    transactions:[],
    publicKey:"",
    contacts: [],

    //cvu:"0000034567800000123455"
    },
    tokens:{
         }
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
                userToken: action.payload,
                isLoading: false,
            }
        case LOADING_FALSE:
            return {
                ...state,
                isLoading:false,
            }

            case GET_DATA_USER:

                const {firstname,lastname,email,pin,password,phone, publicKey, contacts, /* cvu */} = action.payload
                return {...state, userData: {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    pin: pin,
                                    password:password,
                                    phone:phone,
                                    publicKey:publicKey,
                                    transactions: state.userData.transactions,
                                    contacts: contacts,
                                    //cvu: cvu
                                    }}

            case GET_TOKENS:
                return {...state, tokens:action.payload};

            case ADD_FOUNDS:
                return{...state, userData:{...state.userData, balance: parseInt(state.userData.balance) + parseInt(action.payload)}}
      
           case DEPOSIT_TRANSACTION:
             let aux = state.userData.transactions;
             aux.unshift(action.payload)
               return {...state, userData:{...state.userData, transactions: aux}}

            case GET_BALANCE:

            return{...state, userData:{...state.userData, balance: action.payload}};

            case GET_TRANSACTION_USER:

            return {...state, userData:{...state.userData, transactionCurren: action.payload}}



       default: return state 
    }

};

export default rootReducer;