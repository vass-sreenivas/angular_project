import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
@Injectable()
export class RecipeDetailComponent implements OnInit {

  //@Input() recipe:Recipe
  recipe:Recipe
  index:number
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

      this.route.params.subscribe((params:Params)=>{
            this.index=+params['id']
            console.log("Getting Parameters",params['id'])
            this.recipe=this.recipeService.getRecipe(+params['id'])
      })
  }

  onNavigate(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
     this.recipeService.deleteRecipe(this.index);
     this.router.navigate(['/recipes'])
  }

}
