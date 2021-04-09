import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StartEditAction } from './store/shopping-list.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[ShoppingService]
})
export class ShoppingListComponent implements OnInit {

  ingredients:Observable<{ingredients:Ingredient[]}>;
  editMode=false;
  constructor(private shoppingService:ShoppingService,
    private store:Store<AppState>) { }

  ngOnInit(): void {
  
    this.ingredients=this.store.select('shoppingList')
    // this.ingredients=this.shoppingService.ingredients
    //this.shoppingService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      //this.ingredients=ingredients
     //})
  }

  addIngredient(ingredient:Ingredient){
        
    //this.ingredients.push(ingredient);
  }

  onSelectItem(index:number){
    //console.log("Selected Item :"+this.ingredients[index].name+":"+this.ingredients[index].amount)
    //this.shoppingService.onEditItem(index);
    this.store.dispatch(new StartEditAction(index))
    
  }
}
