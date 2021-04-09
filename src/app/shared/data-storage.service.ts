import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import {tap, take, exhaustMap, map} from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { setClassMetadata } from '@angular/core/src/r3_symbols';

@Injectable()
export class DataStorageService{


    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService,private store:Store<AppState>){

    }

    saveData(){
    
        this.http.put('https://test-demo-fc0cf.firebaseio.com/recipes.json',this.recipeService.getRecipes())
                 .subscribe((response)=>{
                     console.log(response)
                 })
    }

    fetchData(){
       
     // return this.authService.user.pipe(take(1),
     return this.store.select('auth').pipe(take(1),
       map(authState=> authState.user),
       exhaustMap(user=>{
        return this.http.get<Recipe[]>('https://test-demo-fc0cf.firebaseio.com/recipes.json',{
            params:new HttpParams().set('auth',user.token)})
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes)
         })

       )
    }
}