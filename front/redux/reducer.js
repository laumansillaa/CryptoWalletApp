
import {LOG} from "./actions"

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
       default: return state 
    }

};

export default rootReducer;