import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem:Recipe
  @Input() index:number
  //@Output() recipeSelected=new EventEmitter<void>()
  // constructor(private recipeService:RecipeService) { }

  constructor() { }

  ngOnInit(): void {
  }

  // onSelected(){
  //   //console.log("Recipe is Clicked");
  //   //this.recipeSelected.emit();
  //   this.recipeService.recipeSeletecd.emit(this.recipeItem);
  // }

}
