import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddIngredeintAction, StopEditAction, DeleteIngredientAction, UpdateIngredientAction } from '../store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('inputName') inputNameRef:ElementRef

  @ViewChild('inputNumber') inputNumberRef:ElementRef

  @ViewChild('form') form:NgForm

 // @Output() ingredient= new EventEmitter<Ingredient>();

  editMode=false;
  editIndex:number
  constructor(private shoppingService:ShoppingService,
    private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex>-1){
        this.editMode=true
        this.editIndex=stateData.editedIngredientIndex
        const ingredient=stateData.editedIngredient
        this.form.setValue({
         name:ingredient.name,
         amount:ingredient.amount
      })

      }else{
        this.editMode=false;
      }
    })
  //   this.shoppingService.editItem.subscribe(number=>{
  //     this.editMode=true
  //     this.editIndex=number
  //     const ingredient=this.shoppingService.getItemAtSpecificIndex(number);
  //     this.form.setValue({
  //        name:ingredient.name,
  //        amount:ingredient.amount
  //     })
  //  })
  }

  addItem(){
    console.log("add Item clicked"); 
    const name=this.inputNameRef.nativeElement.value
    const number=this.inputNumberRef.nativeElement.value
    console.log("name",name);
    console.log("number",number); 
    const addedIngredient=new Ingredient(name, number);
   // this.ingredient.emit(addedIngredient);
    this.shoppingService.addIngredient(addedIngredient);
  }

  onAddItem(){
     console.log(this.form.value)
     if(this.editMode)
      // this.shoppingService.updateIngredient(this.editIndex,new Ingredient(this.form.value.name, this.form.value.amount))
      this.store.dispatch(new UpdateIngredientAction({index:this.editIndex,ingredient:new Ingredient(this.form.value.name, this.form.value.amount)}))
     else{
      const addedIngredient=new Ingredient(this.form.value.name, this.form.value.amount);
      // this.ingredient.emit(addedIngredient);
       //this.shoppingService.addIngredient(addedIngredient); 
       this.store.dispatch(new AddIngredeintAction(addedIngredient))
     }
     this.form.reset()
     this.editMode=false;
  }
  onClear(){
    this.form.reset()
    this.editMode=false;
    this.store.dispatch(new StopEditAction())
  }
  onDelete(){
    //this.shoppingService.removeItemAtSpecificIndex(this.editIndex)
    this.store.dispatch(new DeleteIngredientAction(this.editIndex))
    this.onClear()
  }

}
