import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn:"root"})
export class AuthGuardSerivce implements CanActivate{

    constructor(private authService:AuthService,private router:Router,private store:Store<AppState>){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

       //return this.authService.user.pipe(map(user=>{
        return this.store.select('auth').pipe(
        map(authState=> authState.user),
        map(user=>{
          if(user)
            return true
          return this.router.createUrlTree(['/auth'])
        }))

    }

}