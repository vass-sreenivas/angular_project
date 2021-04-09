import { Action } from '@ngrx/store'
import { User } from '../user.model'

export const LOGIN="LOGIN"
export const LOGOUT="LOGOUT"
export class AuthLogInAction implements Action{
    readonly type=LOGIN
    constructor(public payload:User){}
}

export class AuthLogoutAction implements Action{
    readonly type=LOGOUT
}

export type AuthActions =AuthLogInAction | AuthLogoutAction

