import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { AuthLogInAction } from './store/auth.actions';


export interface AuthResponseData{

idToken :string
email:string
refreshToken:string
expiresIn:string
localId:string
registered?:boolean

}


@Injectable({providedIn:"root"})
export class AuthService{

    //user=new BehaviorSubject<User>(null);

    autoLogoutTimer:any

    constructor(private http:HttpClient,private router:Router,private store:Store<AppState>){

    }

    signUp(email:string,password:string){
       
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3hE9eh5nR07rBrPp0hOPslyWTCWlmeXg',{
            
            email:email,
            password:password,
            returnSecureToken:true

        }).pipe(
            catchError(this.handleError),
            tap(responseData=>{
               this.handleAuthenticate(responseData)
            })
        )
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3hE9eh5nR07rBrPp0hOPslyWTCWlmeXg',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),
                tap(responseData=>{
                    this.handleAuthenticate(responseData)
                })
        )
    }

    logOut(){
        //this.user.next(null);
        this.store.dispatch(new AuthLogInAction(null));
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.autoLogoutTimer){
            clearTimeout(this.autoLogoutTimer);
            this.autoLogoutTimer=null;
        }
    }

    autoLogout(expiresIn:number){
       this.autoLogoutTimer= setTimeout(()=>{
          this.logOut()
        },expiresIn)
    }
  


    handleAuthenticate(responseData:AuthResponseData){

        let expiresIn=new Date(new Date().getTime()+ +responseData.expiresIn*1000)
        const user=new User(responseData.email,
                            responseData.localId,
                            responseData.idToken,
                            expiresIn)
        localStorage.setItem('userData',JSON.stringify(user));
        this.autoLogout(+responseData.expiresIn*1000);
        this.store.dispatch(new AuthLogInAction(user))
        //this.user.next(user)
        this.store.dispatch(new AuthLogInAction(user));
    }

    handleError(errorMsg:HttpErrorResponse){
        console.log(errorMsg)
        let errorResponse="Some Error Occured"
            if(!errorMsg.error || !errorMsg.error.error.message)
              return throwError(errorResponse)
            switch(errorMsg.error.error.message){
                case 'EMAIL_EXISTS':
                    errorResponse="Email Already Exist"
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorResponse="Email Not Found"
                    break;
                case 'INVALID_PASSWORD':
                    errorResponse="Invalid Password"
                    break;
            }
            console.log("In Pipse",errorResponse) 
            return throwError(errorResponse)

    }

    autoLogin(){
        const userData:{
            email:string;
            id:string;
            token:string;
            tokenExpiration:string;
        } =JSON.parse(localStorage.getItem('userData'));
        if(!userData)
          return
        const loadedUser=new User(userData.email,userData.id,userData.token,new Date(userData.tokenExpiration))
        const expires=new Date(userData.tokenExpiration).getTime()-new Date().getTime();
        console.log("Time",expires)
        //this.autoLogout(expires)
       // this.user.next(loadedUser);
       this.store.dispatch(new AuthLogInAction(loadedUser));
    }

    
}