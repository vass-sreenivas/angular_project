import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDEINT="ADD_INGREDEINT"

export const ADD_INGREDEINTS="ADD_INGREDEINTS"
export const DELETE_INGREDEINT="DELETE_INGREDEINT"
export const UPDATE_INGREDEINT="UPDATE_INGREDEINT"
export const START_EDIT="START_EDIT"
export const STOP_EDIT="STOP_EDIT"

export class AddIngredeintAction implements Action{
    readonly type=ADD_INGREDEINT;

    
    constructor(public payload:Ingredient){}
}

export class AddIngredientsAction implements Action{

    readonly type=ADD_INGREDEINTS;

    
    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredientAction implements Action{

    readonly type=UPDATE_INGREDEINT;

    
    constructor(public payload:{index:number,ingredient:Ingredient}){}
}


export class DeleteIngredientAction implements Action{

    readonly type=DELETE_INGREDEINT;

    
    constructor(public payload:number){}
}

export class StartEditAction implements Action{
    readonly type=START_EDIT;
    constructor(public payload:number){}
    
}

export class StopEditAction implements Action{

    readonly type=STOP_EDIT;
}

export type ShoppingListActions=AddIngredeintAction 
| AddIngredientsAction 
| UpdateIngredientAction 
| DeleteIngredientAction
| StartEditAction
| StopEditAction