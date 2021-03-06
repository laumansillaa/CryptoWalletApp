
import {LOG, LOGOUT, DATA_HARD, GET_DATA_USER, TOKENS_HARD, ADD_FOUNDS, DEPOSIT_TRANSACTION, RETRIEVE_TOKEN, LOADING_FALSE, GET_TOKENS, GET_BALANCE, GET_TRANSACTION_USER, GET_BLOCKCHAIN, GET_CRYPTO_CHART, TOKEN_LOG, TOKEN_LOGOUT, GET_CRYPTO_DATA, GET_ALL_STELLAR_DATA, GET_ALL_ETH_DATA} from "./actions"

const initialState={
   Log: false,
   isLoading: true,
   tokenLogged: false,
   userToken: null,
   blockChain:"stellar",
   userData:{

    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    pin: "",
    transactions:[],
    publicKeys:{},
    contacts: [],
    },
    tokens:{
         },
    monthPrices: [0],
    cryptoData: {
        price: "0",
        percDay: "+0%",
        percMonth: "+0%",
        img: "",
        name: ""
    },
    allStellarData: [
        {
            price: "0",
            percDay: "+0%",
            percMonth: "+0%",
            img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            name: "",
            symbol: ""
        }
    ],
    allEthData: [
        {
            price: "0",
            percDay: "+0%",
            percMonth: "+0%",
            img: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            name: "",
            symbol: ""
        }
    ]
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
        case TOKEN_LOG: {
            return {
                ...state,
                tokenLogged: true,
            }
        }
        case TOKEN_LOGOUT: {
            return {
                ...state,
                tokenLogged:false,
            }
        }

            case GET_DATA_USER:

                const {firstname,lastname,email,pin,password,phone, publicKeys, contacts} = action.payload
                return {...state, userData: {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    pin: pin,
                                    password:password,
                                    phone:phone,
                                    publicKeys:publicKeys,
                                    transactions: state.userData.transactions,
                                    contacts: contacts,
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

            case GET_BLOCKCHAIN:
                return {...state, blockChain: action.payload}

            case GET_CRYPTO_CHART:
                return {...state, monthPrices: action.payload}
                
            case GET_CRYPTO_DATA:
                return {...state, cryptoData: action.payload}
            
            case GET_ALL_STELLAR_DATA:
                return {...state, allStellarData: action.payload}
            
            case GET_ALL_ETH_DATA:
                return {...state, allEthData: action.payload}
                
       default: return state
    }

};

export default rootReducer;
