import {LOG, LOGOUT, GET_DATA_USER, ADD_FOUNDS, DEPOSIT_TRANSACTION, GET_TOKENS} from "./actions"
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
  
    balance:"0",

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
                                    transactions: state.userData.transactions,
                                    //cvu: state.userData.cvu
                                    }}

            case GET_TOKENS:
                return {...state, tokens:action.payload};

            case ADD_FOUNDS:
                return{...state, userData:{...state.userData, balance: parseInt(state.userData.balance) + parseInt(action.payload)}}
      
           case DEPOSIT_TRANSACTION:
             let aux = state.userData.transactions;
             aux.unshift(action.payload)
               return {...state, userData:{...state.userData, transactions: aux}}
       default: return state 
    }

};

export default rootReducer;
