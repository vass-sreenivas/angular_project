import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService{

    ingredients:Ingredient[]=[new Ingredient("Ingredient1",100),
                              new Ingredient("Ingredient2",200)]

    editItem=new Subject<number>();

    ingredientsChanged=new Subject<Ingredient[]>();

    loadIngredients(){
        return this.ingredients;
    }
    
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index:number,ingredient:Ingredient){
        this.ingredients[index]=ingredient;
    }

    onEditItem(index:number){
        console.log("on Edit called")
        this.editItem.next(index);
    }

    getItemAtSpecificIndex(index:number){
     return this.ingredients[index];
    }
    removeItemAtSpecificIndex(index:number){
        this.ingredients.splice(index,1)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

}