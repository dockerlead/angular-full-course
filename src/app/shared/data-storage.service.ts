import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

const RECIPES_ENDPOINT_URL = 'https://angular-udemy-course-recipe-default-rtdb.firebaseio.com/recipes.json';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(
      RECIPES_ENDPOINT_URL,
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}
