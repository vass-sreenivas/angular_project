import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()
export class HeaderComponent implements OnInit,OnDestroy {

  @Output()  featureSelected=new EventEmitter<string>();

 

  isAuthenticated=false;
  userSub:Subscription
  constructor(private storageService:DataStorageService,private authService:AuthService,private store:Store<AppState>) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  ngOnInit(): void {
   
   // this.userSub=this.authService.user.subscribe(user=>{
    this.userSub=this.store.select('auth').pipe(map(authState=>authState.user)).subscribe(user=>{
        this.isAuthenticated=!user?false:true //!!user

    })

  }

  // onSelect(feature:string){
  //   console.log("selected Feature",feature)
  //   this.featureSelected.emit(feature);
  // }


  onLogout(){
    this.authService.logOut();
  }

  onSaveData(){
    this.storageService.saveData();
  }

  onFetchData(){
    this.storageService.fetchData().subscribe();
  }

}
