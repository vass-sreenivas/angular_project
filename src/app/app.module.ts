import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {  Routes, RouterModule } from '@angular/router';
import { DropDownDirecive } from './shared/dropdown.directive';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuardSerivce } from './auth/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { authReducer } from './auth/store/auth.reducer';
import { appReducer } from './store/app.reducer';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder.directive';


const appRoutes:Routes=[
  {path:"",redirectTo:"recipes",pathMatch:"full"},
  { path:"recipes",
    component:RecipesComponent,
    canActivate:[AuthGuardSerivce],
    children:[
     {path:"new",component:RecipeEditComponent},
     {path:":id",component:RecipeDetailComponent,resolve:[RecipeResolverService]},
     {path:":id/edit",component:RecipeEditComponent,resolve:[RecipeResolverService]}
  ]},
  {path:"shopping-list", component:ShoppingListComponent },
  {path:"auth", component:AuthComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirecive,
    RecipeEditComponent,
    AuthComponent,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forRoot(appReducer)
  ],
  providers: [RecipeService,DataStorageService,RecipeResolverService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
