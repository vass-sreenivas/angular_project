import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]>{


    constructor(private storageService:DataStorageService,private recipeService:RecipeService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        const recipes=this.recipeService.getRecipes()
        if(recipes.length==0)
          return this.storageService.fetchData()
        else
          return recipes
    }
    


}