
import {LOG, LOGOUT} from "./actions"

const initialState={
   Log: false

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
       default: return state 
    }

};

export default rootReducer;