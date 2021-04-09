import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm:FormGroup
  recipe:Recipe
  editMode=false
  recipeIndex:number
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
         this.recipe=recipes[this.recipeIndex]  
    })
    this.route.params.subscribe((params:Params)=>{
      if(params['id']!=null){
        this.recipeIndex=+params['id']
        this.recipe=this.recipeService.getRecipe(this.recipeIndex)
        this.editMode=true
      }else{
        this.recipe=new Recipe('','','')
      }
      this.initForm()
    })
  }

  private initForm(){
    let recipeIngredients=new FormArray([])
    let recipeName=this.recipe.name
    let recipeImage=this.recipe.image
    let recipeDesc=this.recipe.desc

    if(this.editMode){
      if(this.recipe['ingredients']){
        console.log("had ingredients")
        for(let ingredient of this.recipe['ingredients']){
            recipeIngredients.push(new FormGroup({
            name:new FormControl(ingredient.name,Validators.required),
            amount:new FormControl(ingredient.amount,[Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
        }
      }
    }

    this.recipeForm=new FormGroup({
      name:new FormControl(recipeName,Validators.required),
      image:new FormControl(recipeImage,Validators.required),
      desc:new FormControl(recipeDesc,Validators.required),
      ingredients:recipeIngredients
    })
  }

  getIngredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient(){
    const ingredient=new FormGroup({
      name:new FormControl(null,Validators.required),
      amount:new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredient)
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.recipeIndex,this.recipeForm.value)
      this.router.navigate(['../'],{relativeTo:this.route})
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
      this.router.navigate(['/recipes'])
    }
  }

  onDeleteIngredient(index:number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }
}
