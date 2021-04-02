import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

import { RecipeService } from '../recipes/recipe.service';

const RECIPES_ENDPOINT_URL = 'https://angular-udemy-course-recipe-default-rtdb.firebaseio.com/recipes.json';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
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
    return this.httpClient.get<Recipe[]>(RECIPES_ENDPOINT_URL).subscribe(
      recipes => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
