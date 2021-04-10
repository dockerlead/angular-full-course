import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {map, switchMap, withLatestFrom} from "rxjs/operators";

import {Recipe} from "../recipe.model";
import * as fromApp from '../../store/app.reducer';

import * as RecipesActions from './recipe.actions';

const RECIPES_ENDPOINT_URL = 'https://angular-udemy-course-recipe-default-rtdb.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(RECIPES_ENDPOINT_URL);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes').pipe(map(recipesState => recipesState.recipes))),
    switchMap(([actionData, recipes]) => {
      return this.httpClient.put(
        RECIPES_ENDPOINT_URL,
        recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
