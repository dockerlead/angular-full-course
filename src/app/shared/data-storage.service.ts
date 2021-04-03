import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

const RECIPES_ENDPOINT_URL = 'https://angular-udemy-course-recipe-default-rtdb.firebaseio.com/recipes.json';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authSerivce: AuthService
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
    return this.authSerivce.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        return this.httpClient.get<Recipe[]>(
          RECIPES_ENDPOINT_URL,
          {
            params: new HttpParams().set('auth', user.token)
          }
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
