import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  error=null;

  @ViewChild("authForm") authForm:NgForm;

  @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;

  constructor(private authService:AuthService,private router:Router,private componentResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }

  onSubmit(){
    console.log(this.authForm.value)

    let authObservable :Observable<AuthResponseData>
    if(this.isLoginMode){
      authObservable=this.authService.login(this.authForm.value.email,this.authForm.value.password);

    }else{
      authObservable=this.authService.signUp(this.authForm.value.email,this.authForm.value.password)
    }

    authObservable.subscribe(
      response=>{
        console.log(response)
        this.router.navigate(['/recipes'])
      },error=>{
        this.error=error
        this.showErrorAlert(error);
        console.log(error)
      }
    )

  }

  showErrorAlert(error:string){

    const alertComponentFactory=this.componentResolver.resolveComponentFactory(AlertComponent);

    const viewContainerRef=this.alertHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef=viewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message=error;
    componentRef.instance.close.subscribe(()=>{
      viewContainerRef.clear();
    })
  }

  handleError(){
    this.error=null;
  }

}
