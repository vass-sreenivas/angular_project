import { Ingredient } from 'src/app/shared/ingredient.model';
import { Action } from '@ngrx/store';
import { ADD_INGREDEINT, ShoppingListActions, ADD_INGREDEINTS, DELETE_INGREDEINT, UPDATE_INGREDEINT, START_EDIT, STOP_EDIT } from './shopping-list.actions';


export interface State{

    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number

}

const intialState={
    ingredients:[
        new Ingredient('Apples',5),
        new Ingredient('Oranges',10)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
}


export function shoppingListReducer(state=intialState,action:ShoppingListActions){

    switch(action.type){
        case ADD_INGREDEINT:
            return{
                ingredients:[...state.ingredients,action.payload]
            }
        case ADD_INGREDEINTS:
                return{
                    ingredients:[...state.ingredients,...action.payload]
                }
        case DELETE_INGREDEINT:
                    return{
                        ...state,
                        ingredients:state.ingredients.filter((ig,igIndex)=>{return igIndex!=action.payload})
                    }
        case UPDATE_INGREDEINT:
            
            const ingredient=state.ingredients[action.payload.index]
            const updatedIngredient= {
                ...ingredient,
                ...action.payload.ingredient
            }
            const updatedIngredients= [...state.ingredients]
            updatedIngredients[action.payload.index]=updatedIngredient
            return{
                ...state,
                ingredients:updatedIngredients
            }

        case START_EDIT:
          return {
              ...state,
              editedIngredientIndex:action.payload,
              editedIngredient:{...state.ingredients[action.payload]}
          }
        case STOP_EDIT:
            return{
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1,

            }

        default:
            return state
    }

}