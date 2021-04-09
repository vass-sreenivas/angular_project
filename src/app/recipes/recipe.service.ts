import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class RecipeService{

  public recipeSeletecd=new EventEmitter<Recipe>()

  recipesChanged=new Subject<Recipe[]>()

  private recipes:Recipe[]=[]
  // private recipes:Recipe[]=[new Recipe("Recepie1","Description Of Recepie1","https://minimalistbaker.com/wp-content/uploads/2016/08/AMAZING-Chickpea-SHAKSHUKA-1-Pot-30-minutes-so-much-plantprotein-vegan-glutenfree-plantbased-shakshuka-recipe-easy-healthy.jpg"),
  // new Recipe("Recepie2","Description Of Recepie2","https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg"),
  // new Recipe("Recepie3","Description Of Recepie3","https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",[new Ingredient("Bread",10),new Ingredient("sugar",20)])]

  getRecipes(){
      return this.recipes.slice();
  }

  getRecipe(index:number):Recipe{
    return this.recipes[index];
  }

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes
    this.recipesChanged.next(this.recipes)
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes)
  }
  updateRecipe(index:number,recipe:Recipe){

    this.recipes[index]=recipe
    this.recipesChanged.next(this.recipes)
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    console.log("Recipes Size",this.recipes.length)
    this.recipesChanged.next(this.recipes)
  }

}