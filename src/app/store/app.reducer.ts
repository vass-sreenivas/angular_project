import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';



export interface AppState{
    shoppingList:fromShoppingList.State
    auth:fromAuth.State
    type:string
}

export const appReducer:ActionReducerMap<any>={
    shoppingList:fromShoppingList.shoppingListReducer,
    auth:fromAuth.authReducer
};
