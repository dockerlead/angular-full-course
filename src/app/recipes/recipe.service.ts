import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelectionEvent = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe A', 'This is test A', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg'),
    new Recipe('Test Recipe B', 'This is test B', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
