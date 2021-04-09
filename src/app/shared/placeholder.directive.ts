import { Directive, ElementRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector:'[placeHolder]'
})
export class PlaceHolderDirective{

  constructor(public viewContainerRef:ViewContainerRef){

  }
}
