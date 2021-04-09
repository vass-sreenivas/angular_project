import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State{
    user:User
}

const intialState={
    user:null
}


export function authReducer(state=intialState,action:AuthActions.AuthActions){

    switch(action.type){
        case AuthActions.LOGIN:
            console.log('payload'+action.payload)
            return {
               ...state,
               user:action.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
               user:null
            }
        default:
            return {
                user:null
            }
    }
}