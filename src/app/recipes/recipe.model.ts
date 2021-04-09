import { Ingredient } from '../shared/ingredient.model';

export class Recipe{


    constructor(public name:String,public desc:String,public image:String,public ingredients?:Ingredient[]){

    }
}